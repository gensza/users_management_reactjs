import React from 'react'
import PropTypes from 'prop-types'
import Pagination from 'react-bootstrap/Pagination'
import { CCol, CRow } from '@coreui/react'

function CustomPagination(props) {
  const { entriesToShow, totalData, currentPage, setCurrentPage } = props
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalData / entriesToShow); i++) {
    pageNumbers.push(i)
  }

  let start = 1,
    end = pageNumbers.length
  if (currentPage - 2 > 1) {
    start = currentPage - 2
  }
  if (currentPage + 2 < pageNumbers.length) {
    end = currentPage + 2
  }

  let startingRow = (currentPage - 1) * entriesToShow + 1
  let endingRow = parseInt(startingRow) + parseInt(entriesToShow) - 1
  if (endingRow > totalData) {
    endingRow = totalData
  }

  return (
    <CRow className="mt-2 mb-2">
      <CCol>
        <p style={{ float: 'left' }}>Showing {startingRow} to {endingRow} of {totalData} entries</p>
      </CCol>
      <CCol>
        <Pagination style={{ float: 'right' }}>
          <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
          <Pagination.Prev
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {start !== 1 && <Pagination.Ellipsis />}
          {pageNumbers.slice(start - 1, end).map((number) => (
            <Pagination.Item
              key={number}
              onClick={() => setCurrentPage(number)}
              active={currentPage === number}
            >
              {number}
            </Pagination.Item>
          ))}
          {end !== pageNumbers.length && <Pagination.Ellipsis />}
          <Pagination.Next
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
          />
          <Pagination.Last
            onClick={() => setCurrentPage(pageNumbers.length)}
            disabled={currentPage === pageNumbers.length}
          />
        </Pagination>
      </CCol>
    </CRow>
  )
}

CustomPagination.propTypes = {
  entriesToShow: PropTypes.string,
  totalData: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
}

export default CustomPagination
