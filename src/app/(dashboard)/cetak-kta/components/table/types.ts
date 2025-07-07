export interface CetakKtaTableData {
  id: number
  npa: string
  nik: string
  namaAnggota: string
  tempatLahir: string
  tanggalLahir: string
  foto?: string
  qrCode?: string
  cetakKtaBiasa: boolean
  cetakKtaMultiPayment: boolean
  status: 'active' | 'inactive'
  selected?: boolean
}

export interface ActionButtonType {
  type: 'CR80' | 'CR79'
  variant: 'primary' | 'secondary'
}

export interface PaginationInfo {
  currentPage: number
  totalPages: number
  pageSize: number
  totalItems: number
}