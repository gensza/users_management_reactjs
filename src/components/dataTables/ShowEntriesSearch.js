import React from 'react'
import PropTypes from 'prop-types'
import { CCol, CRow, CFormInput, CFormLabel, CFormSelect } from '@coreui/react'

function ShowEntriesSearch(props) {
  const { entriesToShow, handleEntriesChange, searchQuery, handleSearchChange } = props

  return (
    <CRow className="mt-2 mb-2">
      <CCol>
        <CFormLabel style={{ float: 'left' }}>Show&nbsp;</CFormLabel>
        <CFormSelect
          name="entriesToShow"
          id="entriesToShow"
          value={entriesToShow}
          onChange={handleEntriesChange}
          className="w-25"
          style={{ float: 'left' }}
          size="sm"
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </CFormSelect>
      </CCol>
      <CCol>
        <CFormInput
          type="text"
          name="search"
          id="search"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-50"
          style={{ float: 'right' }}
          size="sm"
          placeholder="search"
        />
      </CCol>
    </CRow>
  )
}

ShowEntriesSearch.propTypes = {
  entriesToShow: PropTypes.string,
  handleEntriesChange: PropTypes.func,
  searchQuery: PropTypes.string,
  handleSearchChange: PropTypes.func,
}

export default ShowEntriesSearch
