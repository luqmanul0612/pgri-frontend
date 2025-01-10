import CardRole from "@/app/(dashboard)/role/components/CardRole";

const ContentRoleAdmin: React.FC<any> = (props) => {
  return (
    <div>
      <div className={'flex'}>
        <div className={'w-1/2'}>
          <h2 className={'text-primary text-base font-medium'}>Admin Pusat</h2>
          <CardRole></CardRole>
        </div>
        <div className={'w-1/2'}>2</div>
      </div>
    </div>
  )
}

export default ContentRoleAdmin;
