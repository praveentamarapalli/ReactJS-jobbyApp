import {BsSearch} from 'react-icons/bs'
import ProfileDetails from '../ProfileDetails'
import './index.css'

const FiltersGroup = props => {
  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event)
  }

  const onEnterSearchInput = event => {
    const {getJobsList} = props
    if (event.key === 'Enter') {
      getJobsList()
    }
  }

  const renderSearchInput = () => {
    const {getJobsList, searchInput} = props
    return (
      <div className="search-input-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          value={searchInput}
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-button-container"
          onClick={getJobsList}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  const renderTypeOfEmployment = () => {
    const {employmentTypesList} = props
    return (
      <div className="employment-type-container">
        <h1 className="employment-type-heading"> Type of Employment</h1>
        <ul className="employee-type-list-container">
          {employmentTypesList.map(eachEmployeeType => {
            const {changeEmployeeList} = props
            const onSelectEmployeeType = event => {
              changeEmployeeList(event.target.value)
            }
            return (
              <li
                className="employee-item"
                key={eachEmployeeType.employmentTypeId}
                onChange={onSelectEmployeeType}
              >
                <input
                  type="checkbox"
                  id={eachEmployeeType.employmentTypeId}
                  className="check-input"
                  value={eachEmployeeType.employmentTypeId}
                />
                <label
                  htmlFor={eachEmployeeType.employmentTypeId}
                  className="check-label"
                >
                  {eachEmployeeType.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const renderSalaryRange = () => {
    const {salaryRangesList} = props
    return (
      <div>
        <h1 className="salary-range-heading">Salary Range</h1>
        <ul>
          {salaryRangesList.map(eachItem => {
            const {changeSalary} = props
            const onClickSalary = () => {
              changeSalary(eachItem.salaryRangeId)
            }
            return (
              <li
                onClick={onClickSalary}
                key={eachItem.salaryRangeId}
                className="salary-item"
              >
                <input
                  type="radio"
                  id={eachItem.salaryRangeId}
                  name="salary"
                  className="check-input"
                />
                <label htmlFor={eachItem.salaryRangeId} className="check-label">
                  {eachItem.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div>
      {renderSearchInput()}
      <ProfileDetails />
      <hr className="horizontal-line" />
      {renderTypeOfEmployment()}
      <hr className="horizontal-line" />
      {renderSalaryRange()}
    </div>
  )
}

export default FiltersGroup
