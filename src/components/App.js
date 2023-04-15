import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';


import UserCard from './userCard/UserCard';
import FilterOptions from './filterOptions/FilterOptions';


function App() {




  const users = useSelector(state => state.users.userArr);

  const [searchTxt, setSearchTxt] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  //stores the filter 'options' when checked
  const [filters, setFilters] = useState([]);
  const [filterUsers, setFilteredUsers] = useState([]);

  //stores the 'checked' input 'tags'
  const [target, setTarget] = useState([]);
  const [targetCheck, setTargetCheck] = useState({
    Business_Development: false,
    Finance: false,
    IT: false,
    Management: false,
    Marketing: false,
    Sales: false,
    UI_Designing: false,
    Male: false,
    Female: false,
    Agender: false,
    Bigender: false,
    Non_binary: false,
    Polygender: false,
    Genderqueer: false,
    true: false,
    false: false,
  });

  //for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageRange, setPageRange] = useState(5); // Number of page numbers to display
  const [totalPages, setTotalPages] = useState();


  // Calculate start and end index of page range
  const pageRangeStart = Math.max(1, currentPage - Math.floor(pageRange / 2));
  const pageRangeEnd = Math.min(totalPages, pageRangeStart + pageRange - 1);

  // Render page numbers within page range
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = pageRangeStart; i <= pageRangeEnd; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={currentPage === i ? "active  custom-font-Size" : "custom-font-Size"}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };


  // Calculate start and end index of users to display
  const startIndex = (currentPage - 1) * 20;
  const endIndex = startIndex + 20;

  function onDelete(id) {

    const foundTarget = target.find(x => x.value === id);

    //marks the input tags as 'unchecked'  
    foundTarget.checked = false;

    //removes the 'unchecked' input tag values from the array
    setFilters(prevValue => {
      return prevValue.filter(check => {
        return check !== id;
      })
    });
  }

  //for filter options
  function filterHandler(e) {
   
    if (filters.length === 0) {
      setCurrentPage(1);
    }

    var updatedList = [...filters];
    var updatedTargets = [...target];

    const { name, checked } = e.target;
    setTargetCheck((prevState) => ({
      ...prevState,
      [name]: checked,
    }));


    if (e.target.checked) {
      updatedList = [...filters, e.target.value];
      updatedTargets = [...target, e.target];
    } else {
      updatedList.splice(filters.indexOf(e.target.value), 1);
      updatedTargets.splice(target.indexOf(e.target), 1);
    }
    setFilters(updatedList);
    setTarget(updatedTargets);


  }

  function changeHandler(e) {
    e.preventDefault();
    let _searchQ = e.target.value;

    if (_searchQ === "") {
      setCurrentPage(1);
    }

    setSearchTxt(_searchQ);
    _searchQ = _searchQ.toLowerCase();

    let arr = users.filter(person => {
      let full_name = `${person.first_name} ${person.last_name}`;
      full_name = full_name.toLowerCase();
      return full_name.includes(_searchQ);
    });

    setSearchResult(arr);
  }


  const filteredUsers = useCallback(() => {
        
      let a = users.filter(user => {
        return user.domain.includes(filters[filters.indexOf(user.domain)]) ||
          user.gender.includes(filters[filters.indexOf(user.gender)]) ||
          String(user.available).includes(filters[filters.indexOf(String(user.available))]);
      });
      setFilteredUsers(a);
    },
    [filters, users]);



  let _finalUser = searchTxt.length !== 0 ? searchResult : filterUsers.length !== 0 ? filterUsers : users;


  useEffect(() => {

    if (_finalUser.length !== undefined) {
      setTotalPages(Math.ceil(_finalUser.length / 20));

    } else {
      setTotalPages(Math.ceil(users.length / 20));
    }

    filteredUsers();

  }, [users, _finalUser.length, filteredUsers]);

  // Slice users based on start and end index
  const visibleUsers = _finalUser.slice(startIndex, endIndex);


  return (
    <div className="App container-fluid p-2 p-lg-5 p m-0 ">

      <div className='text-center'>
        <input className='p-2 searchInput'
          type="text"
          name="search_name"
          id="name_search"
          placeholder='search...'
          onChange={changeHandler} />
      </div>
      <div className='col-sm-12 col-md-4 text-center pe-md-5'>
        <button data-bs-toggle='collapse'
          data-bs-target='#filterOptions'
          type='button'
          className='btn btn-outline-dark bg-light text-dark mt-3 mt-md-0 w-50 rounded-pill'>
          Filter
        </button>
      </div>
      <ul className='d-flex list-unstyled flex-wrap mt-3 justify-content-center'>
        {filters.map(check => {
          return <FilterOptions key={check} id={check} option={check} deleteFn={onDelete} />;
        })}
      </ul>
      <div id='filterOptions' className='collapse bg-light text-dark'>
        <hr />
        Domain
        <label className='d-block'>
          <input type="checkbox" name="Business_Development" value="Business Development" id="Business_Development" onChange={filterHandler} />
          : Business Development
        </label>
        <label className='d-block'>
          <input type="checkbox" name="Finance" value="Finance" id="Finance" onChange={filterHandler} />
          : Finance
        </label>
        <label className='d-block'>
          <input type="checkbox" name="IT" value="IT" id="IT" onChange={filterHandler} />
          : IT
        </label>
        <label className='d-block'>
          <input type="checkbox" name="Management" value="Management" id="Management" onChange={filterHandler} />
          : Management
        </label>
        <label className='d-block'>
          <input type="checkbox" name="Marketing" value="Marketing" id="Marketing" onChange={filterHandler} />
          : Marketing
        </label>
        <label className='d-block'>
          <input type="checkbox" name="Sales" value="Sales" id="Sales" onChange={filterHandler} />
          : Sales
        </label>
        <label className='d-block'>
          <input type="checkbox" name="UI_Designing" value="UI Designing" id="UI_Designing" onChange={filterHandler} />
          : UI Designing
        </label>

        <hr />
        Gender
        <label className='d-block'>
          <input type="checkbox" name="Male" value="Male" id="Male" onChange={filterHandler} />
          : Male
        </label>
        <label className='d-block'>
          <input type="checkbox" name="Female" value="Female" id="Female" onChange={filterHandler} />
          : Female
        </label>
        <label className='d-block'>
          <input type="checkbox" name="Agender" value="Agender" id="Agender" onChange={filterHandler} />
          : Agender
        </label>
        <label className='d-block'>
          <input type="checkbox" name="Bigender" value="Bigender" id="Bigender" onChange={filterHandler} />
          : Bigender
        </label>
        <label className='d-block'>
          <input type="checkbox" name="Non_Binary" value="Non-binary" id="Non-Binary" onChange={filterHandler} />
          : Non binary
        </label>
        <label className='d-block'>
          <input type="checkbox" name="Polygender" value="Polygender" id="Polygender" onChange={filterHandler} />
          : Polygender
        </label>
        <label className='d-block'>
          <input type="checkbox" name="Genderqueer" value="Genderqueer" id="Genderqueer" onChange={filterHandler} />
          : Genderqueer
        </label>

        <hr />
        Availabity
        <label className='d-block'>
          <input type="checkbox" name="true" value="true" id="True" onChange={filterHandler} />
          : True
        </label>
        <label className='d-block'>
          <input type="checkbox" name="false" value="false" id="False" onChange={filterHandler} />
          : False
        </label>

      </div>
      <div className="row justify-content-center m-0">

        {visibleUsers.map(data => {
          return <div key={data.id} id={data.id} className="col-12 col-lg-4 col-md-6 col-sm-6 p-2">
            <UserCard
              fname={data.first_name}
              lname={data.last_name}
              email={data.email}
              gender={data.gender}
              avatar={data.avatar}
              domain={data.domain}
              available={data.available} />
          </div>;
        })}

      </div>
      <div className="pagination justify-content-center  mt-3">
        <button
        className='custom-font-Size'
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button className=' custom-font-Size'
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
