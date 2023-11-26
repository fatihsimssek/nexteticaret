'use client';
import { Product } from '@prisma/client';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useCallback } from 'react';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import firebaseApp from '@/libs/firebase';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface ManageClientProps {
  products: Product[];
}

const ManageClient: React.FC<ManageClientProps> = ({ products }) => {
    const storage = getStorage(firebaseApp)
    const router= useRouter()
  let rows: any = [];

  if (products) {
    rows = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
        image: product.image,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'category', headerName: 'Category', width: 100 },
    { field: 'brand', headerName: 'Brand', width: 100 },
    {
      field: 'inStock',
      headerName: 'Brand',
      width: 100,
      renderCell: (params) => (
        <div>{params.row.inStock == true ? 'In Stock' : 'Out of stock'}</div>
      ),
    },
    {
      field: 'actions',
      headerName: 'Action',
      width: 100,
      renderCell: (params) => (
        <button
          onClick={() => handleDelete(params.row.id, params.row.image)}
          className="mx-4 text-red-500 cursor-pointer"
        >
          Sil
        </button>
      ),
    },
    ];
    
    const handleDelete = useCallback( async(id:string,image:any) => {
       toast.success('Sildirme işlemi için bekleyin...')
        const handleDeleteImage = async() => {
            try {
                const imageRef = ref(storage, image)
                await deleteObject(imageRef)
            } catch (error) {
                return console.log('bir hata mevcut', error)
            }
        }
        await handleDeleteImage();
        //burada sildirme işlemleri ile api isteği atılacak
        axios.delete(`/api/product/${id}`)
            .then(() => {
                toast.success('Sildirme işlemi başarılı...')
                router.refresh()
            }).catch((error) => {
            console.log(error)
        })
    },[])
  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default ManageClient;
