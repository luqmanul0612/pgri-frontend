import CardRole from "@/app/(dashboard)/role/components/CardRole";

const ContentRoleAdmin: React.FC<any> = (props) => {
  const AdminPusat = [
    {
      name: 'Rizwan Gustama',
      email: 'rizonegustama@gmail.com',
    },
    {
      name: 'Rizwan Gustama 01',
      email: 'rizonegustama@gmail.com',
    },
    {
      name: 'Rizwan Gustama 01',
      email: 'rizonegustama@gmail.com',
    }
  ]

  const adminRegional = [
    {
      name: 'Rizwan Gustama 01',
      email: 'rizzonegustama@gmail.com',
      totalProvinces: '32',
      total: '140'
    },
    {
      name: 'Rizwan Gustama 01',
      email: 'rizzonegustama@gmail.com',
      totalProvinces: '32',
      total: '160'
    },
    {
      name: 'Rizwan Gustama 01',
      email: 'rizzonegustama@gmail.com',
      totalProvinces: '32',
      total: '190'
    },
  ]
  return (
    <div className={'bg-white p-4 rounded-2xl'}>
      <div className={'flex gap-5'}>
        <div className={'w-1/2 flex flex-col gap-4'}>
          <div className={'flex flex-col gap-4'}>
            <h2 className={"text-primary text-base font-medium"}>Admin Pusat</h2>
            <div className={'flex flex-col gap-4'}>
              { AdminPusat.map((item: any, index: number) => (
                <CardRole key={index} itemData={item} isIcon={true} />
              ))}

            </div>
          </div>
          <div className={'flex flex-col gap-4'}>
            <h2 className={"text-primary text-base font-medium"}>Admin Provinsi, Kabupaten, Kecamatan</h2>
            <div className={'flex flex-col gap-4'}>
              { adminRegional.map((item: any, index: number) => (
                <CardRole key={index} itemData={item}  isIcon={false}></CardRole>
              )) }
            </div>
          </div>
        </div>
        <div className={"w-1/2 flex flex-col gap-5"}>
          <div className={'rounded-2xl bg-[#D9D9D9] h-[250px] w-full'}></div>
          <div>
            <h2 className={'font-medium text-sm pb-4'}>INFORMASI WEWENANG ROLE ADMIN</h2>
            <ol type={'1'} className={'list-decimal pl-10'}>
              <li className={'text-sm pl-1'}>Admin Pusat memiliki wewenang untuk membuat akun Admin Pusat dan Admin Provinsi. Admin Provinsi dapat membuat akun Admin Kabupaten, sedangkan Admin Kabupaten dapat membuat akun Admin Kecamatan.</li>
              <li className={'text-sm pl-1'}>Iuran diproses oleh Admin Kecamatan dengan persentase total pembagian sebagai berikut: 40% untuk Kecamatan, 30% untuk Kabupaten, 20% untuk Provinsi, dan 10% untuk Pusat.</li>
              <li className={'text-sm pl-1'}>Terdapat setidaknya dua admin di setiap Provinsi, Kabupaten dan Kecamatan dimana dua admin itu terbagi sebagai admin pengelola Anggota PGRI dan Admin pengelola Keuangan (Baik itu Iuran, Pelatihan dan lainnya)</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentRoleAdmin;
