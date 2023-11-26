import { getCurrentUser } from "@/app/actions/getCurrentUser"
import getProducts from "@/app/actions/getProducts"
import WarningText from "@/app/components/WarningText"
import ManageClient from "@/app/components/admin/ManageClient"


const Manage = async () => {
    const products= await getProducts({category:null})
    const currentUser = await getCurrentUser()
  
    if (!currentUser || currentUser.role !== "ADMIN") { 
  
      return (
        <WarningText text="Buraya Giriş Yasak"/>
      )
    }
  return (
    <div className="w-full m-2">
          <ManageClient products={products} />
  </div>
  )
}

export default Manage