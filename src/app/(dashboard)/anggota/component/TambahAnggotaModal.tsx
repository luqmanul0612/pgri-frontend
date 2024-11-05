import FormModal from '@/components/modal/FormModal'
import React from 'react'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void; 
}

const TambahAnggotaModal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
}) => {
  return (
    <FormModal isOpen={isOpen} onClose={onClose}>
        <div>
            <div>Tambah Anggota</div>
            <div>Kamu dapat menambahkan anggota baru secara langsung atau import data excel-mu!</div>
        </div>
    </FormModal>
  )
}

export default TambahAnggotaModal