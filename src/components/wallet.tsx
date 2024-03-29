import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabaseClient";
import imagena from "../assets/images/martian.jpg"



function WalletSpecifier (props:any)  {
  const {text} = props;
  
  const isMartianWalletInstalled = (window as any).martian

  const checkDB = async (address:string) =>{
    const {data,error}  = await supabase.from("Profile").select().eq("aptos_id",address);
    
    if (error){
      return {
        imageUrl:"",
        nickname:"",
      }
    }

    if (data?.length === 0){
      const {error} = await supabase.from("Profile").insert({"aptos_id":address});
      if (error){
        console.log(error)
        return {
          imageUrl:"",
          nickname:"",
        }
      }
      else{
        console.log("Inserted profile");
        return {
          imageUrl:"https://gsnbshovrlixxitmnbzj.supabase.co/storage/v1/object/sign/avatars/mushroom.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL211c2hyb29tLnBuZyIsImlhdCI6MTY3ODIwODAwNSwiZXhwIjoxNzA5NzQ0MDA1fQ.jTPKEJKZCbDMFiLxkmcDBJsMYsAPlqR3r0fNh_V3eUU&t=2023-03-07T16%3A53%3A25.700Z",
          nickname:"RockBuster",
        }
      }
    }
    else{
      return {
        imageUrl:data[0]['ImageUrl'],
        nickname:data[0]['NickName'],
      }
    }
    
  }

  const navigate = useNavigate();
  const getProvider = async () => {
    const response = await (window as any).martian.connect();
    const data = response
    props.handleAddressChange(data["address"]);
    if(data["method"] === "connected"){
      const result = await checkDB(data["address"]);
      props.handleImageChange(result["imageUrl"]);
      props.setdiscounnect(false);
      navigate("/mint")
     
    }
    console.log(data);
  }

  
  


    return (
      <>
          <button className="flex text-center  bg-black hover:bg-black-800 text-white font-semibold py-2 px-4 border border-gray-400  rounded shadow" onClick={getProvider}>
          <img className="w-7 h-7 rounded-full mr-0.5" src={imagena} alt="user photo" /> [  Connect To Martian Wallet ]
          </button>
      </>
    )
    
  
    
}

export default WalletSpecifier;