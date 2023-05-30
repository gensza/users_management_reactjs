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
  CBadge,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { API_URL } from '../../utils/constans'
import axios from 'axios'
import ShowEntriesSearch from 'src/components/dataTables/ShowEntriesSearch'
import CustomPagination from 'src/components/dataTables/CustomPagination'
import { cilPencil, cilSortAscending, cilSortDescending } from '@coreui/icons'

export default class list_menu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menus: [],
      column: [],
      sortColumn: 'menu_id',
      sortDirection: 'asc',
      currentPage: 1,
      totalData: 0,
      entriesToShow: '10',
      searchQuery: '',
      loading: true,
    }
  }

  componentDidMount() {
    this.fetchDataHeaderTable()
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

    if (prevState.sortDirection !== this.state.sortDirection) {
      this.fetchDataMenus()
    }
  }

  fetchDataMenus = () => {
    const limit = this.state.entriesToShow
    const page = this.state.currentPage
    const search = this.state.searchQuery
    const sortColumn = this.state.sortColumn
    const sortDirection = this.state.sortDirection
    axios
      .get(
        API_URL +
          `menu?limit=${limit}&page=${page}&param=${search}&sortColumn=${sortColumn}&sortDirection=${sortDirection}`,
      )
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

  fetchDataHeaderTable = () => {
    const column = [
      { key: 'menu_id', label: 'No' },
      { key: 'name_menu', label: 'Name' },
      { key: 'link', label: 'Link' },
      { key: 'icon', label: 'Icon' },
      { key: 'status', label: 'Status' },
      { key: '', label: 'Action' },
    ]
    this.setState({ column })
  }

  handleSort = (columnKey) => {
    const sortColumn = columnKey
    this.setState({ sortColumn })
    const sortDirection = this.state.sortDirection === 'asc' ? 'desc' : 'asc'
    this.setState({ sortDirection })
  }

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
    const {
      menus,
      entriesToShow,
      searchQuery,
      loading,
      totalData,
      currentPage,
      column,
      sortDirection,
    } = this.state
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
                              onClick={() => this.handleSort(column.key)}
                            >
                              {column.label}
                              <CIcon
                                icon={
                                  sortDirection === 'asc' ? cilSortDescending : cilSortAscending
                                }
                                size="sm"
                                onClick={() => this.handleSort(column.key)}
                                style={{ cursor: 'pointer' }}
                              />
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
                              <CTableDataCell>
                                <CBadge color={`${item.status === 1 ? 'success' : 'danger'}`}>
                                  {item.status === 1 ? 'Active' : 'Non Active'}
                                </CBadge>
                              </CTableDataCell>
                              <CTableDataCell>
                                <CButton color="warning" size='sm'>
                                <CIcon
                                icon={
                                  cilPencil
                                }
                                size="sm"
                              />
                                </CButton>
                              </CTableDataCell>
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
