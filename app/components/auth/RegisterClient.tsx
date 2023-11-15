'use client'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import {FaGoogle} from 'react-icons/fa'
import AuthContainer from "../containers/AuthContainer"
import Button from "../general/Button"
import Heading from "../general/Heading"
import Input from "../general/Input"
import Link from 'next/link';


const RegisterClient = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>()
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    
  }
  return (
    
    <AuthContainer>
      <div className="w-full md:w-[500px] p-3 shadow-lg rounded-md">
        <Heading text="Register" center />
        <Input placeholder="Ad" type="text" id="name" register={register} errors={errors} required />
        <Input placeholder="Email" type="text" id="email" register={register} errors={errors} required />
        <Input placeholder="Parola" type="text" id="password" register={register} errors={errors} required />
        <Button text="Kayıt Ol" onClick={handleSubmit(onSubmit)}/>
        <div className= "text-center my-2 text-sm text-red-500">Daha Önce Kayıt Olduysanız <Link className='underline' href= '/login'>Buraya tıklayın.</Link> </div>
        <div className='text-center my-2 font-bold text-lg'>OR</div>
        <Button text="Google İle Üye Ol" icon={FaGoogle} outline onClick={handleSubmit(onSubmit)}/>
      </div>
      </AuthContainer>
    
  )
}

export default RegisterClient