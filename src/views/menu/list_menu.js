import React, { Component } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CSpinner,
} from '@coreui/react'
import { API_URL } from '../../utils/constans'
import axios from 'axios'
import ShowEntriesSearch from 'src/components/dataTables/ShowEntriesSearch'
import CustomPagination from 'src/components/dataTables/CustomPagination'

export default class list_menu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menus: [],
      column: [
        { key: 'no', label: 'No' },
        { key: 'name', label: 'Name' },
        { key: 'link', label: 'Link' },
        { key: 'icon', label: 'Icon' },
        { key: 'status', label: 'Status' },
        { key: 'action', label: 'Action' },
      ],
      sortColumn: '',
      sortDirection: '',
      currentPage: 1,
      totalData: 0,
      entriesToShow: '10',
      searchQuery: '',
      loading: true,
    }
  }

  componentDidMount() {
    this.fetchDataMenus()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.fetchDataMenus()
    }

    if (prevState.entriesToShow !== this.state.entriesToShow) {
      this.fetchDataMenus()
    }

    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchDataMenus()
    }

    if (prevState.totalData !== this.state.totalData) {
      this.fetchDataMenus()
    }
  }

  fetchDataMenus = () => {
    const limit = this.state.entriesToShow
    const page = this.state.currentPage
    const search = this.state.searchQuery
    axios
      .get(API_URL + `menu?limit=${limit}&page=${page}&param=${search}`)
      .then((res) => {
        const menus = res.data.data
        this.setState({ menus })
        const loading = false
        this.setState({ loading })
        const totalData = res.data.count
        this.setState({ totalData })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // handleSort = (columnKey) => {
  //   if (this.state.sortColumn === columnKey) {
  //     // if the same column is clicked again, toggle the sort direction
  //     const sortDirection = this.state.sortDirection === 'asc' ? 'desc' : 'asc'
  //     this.setState(sortDirection)
  //   } else {
  //     // if a different column is clicked, set it as the new sorting column
  //     const sortColumn = columnKey
  //     this.setState({ sortColumn })
  //     const sortDirection = 'asc'
  //     this.setState({ sortDirection })
  //   }
  // }

  handleEntriesChange = (event) => {
    const entriesToShow = event.target.value
    this.setState({ entriesToShow })
  }

  handleSearchChange = (event) => {
    const searchQuery = event.target.value
    this.setState({ searchQuery })
    this.fetchDataMenus()
  }

  setCurrentPage = (event) => {
    const currentPage = event
    this.setState({ currentPage })
  }

  render() {
    const { menus, entriesToShow, searchQuery, loading, totalData, currentPage, column, sortColumn, sortDirection } = this.state
    const startIndex = (currentPage - 1) * entriesToShow
    return (
      <div>
        {loading ? (
          <CSpinner animation="border" color="primary" />
        ) : (
          <>
            <CRow>
              <CCol xs={12}>
                <CCard className="mb-4">
                  <CCardHeader>
                    <strong>React Table</strong> <small>Basic example</small>
                  </CCardHeader>
                  <CCardBody>
                    <p className="text-medium-emphasis small">
                      Using the most basic table CoreUI, here&#39;s how <code>&lt;CTable&gt;</code>
                      -based tables look in CoreUI.
                    </p>
                    <ShowEntriesSearch
                      handleSearchChange={this.handleSearchChange}
                      handleEntriesChange={this.handleEntriesChange}
                      entriesToShow={entriesToShow}
                      searchQuery={searchQuery}
                    />
                    <CTable bordered>
                      <CTableHead>
                        <CTableRow>
                          {column.map((column) => (
                            <CTableHeaderCell
                              key={column.key}
                              // onClick={() => this.handleSort(column.key)}
                              className={sortColumn === column.key ? `sort-${sortDirection}` : ''}
                            >
                              {column.label}
                            </CTableHeaderCell>
                          ))}
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {menus &&
                          menus.map((item, index) => (
                            <CTableRow key={item.menu_id}>
                              <CTableHeaderCell scope="row">
                                {startIndex + index + 1}
                              </CTableHeaderCell>
                              <CTableDataCell>{item.name_menu}</CTableDataCell>
                              <CTableDataCell>{item.link}</CTableDataCell>
                              <CTableDataCell>{item.icon}</CTableDataCell>
                              <CTableDataCell>{item.status}</CTableDataCell>
                              <CTableDataCell>#</CTableDataCell>
                            </CTableRow>
                          ))}
                      </CTableBody>
                    </CTable>
                    <CustomPagination
                      entriesToShow={entriesToShow}
                      totalData={totalData}
                      currentPage={currentPage}
                      setCurrentPage={this.setCurrentPage}
                    />
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </>
        )}
      </div>
    )
  }
}
