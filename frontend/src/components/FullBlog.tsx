import { useState  } from "react"
import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate, useParams  } from "react-router-dom"

export const FullBlog = ({ blog }: { blog: Blog }) => {
    const [updateRender, setUpdateRender] = useState(false)
    const [del, setDel] = useState(false)
    const [data, setData] = useState({
        title: "",
        content:''
    })
    const navigate = useNavigate()
    
    const { id } = useParams(); 
    
    const parsedInt = parseInt(id?.toString() ?? "", 10);

     async function deleteBlog() {
         try {
             const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/delete/${parsedInt}`, {
             headers: {
                 Authorization: localStorage.getItem("token")
             }
         });
            console.log(response.data)
            navigate(`/blogs`);
            } catch (e) {
            alert("Please check your credentials and try again")
        }
    }

 async function sendUpdate() {
     try {
            
            if (data.title === "" || data.content === "") { 
                alert("Please enter a title and content");
                return;
            }
            const requestData = {
            id: parsedInt,
            title: data.title,
            content: data.content
            };
            console.log(requestData)
         const response = await axios.put(`${BACKEND_URL}/api/v1/blog/update`, requestData, {headers: {
                Authorization: localStorage.getItem("token")
            }});
            console.log(response.data)
            navigate(`/blogs`);
            } catch (e) {
            alert("Please check your credentials and try again")
        }
    }

    const renderDeleteConfimation = () => {
        return (
             <div className="absolute top-[%] left-[25%] h-[300px] bg-green-200 w-[700px] rounded p-4">
                <div className="flex flex-col justify-center items-center h-[100%]">
                    <h1 className="text-2xl"> Are you sure to delete this post! </h1>
                    <div className="flex flex-row justify-center items-center mt-4">
                        <div>
                            <button onClick={deleteBlog} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete </button>
                        </div>
                         <div>
                            <button onClick={()=> setDel((p)=> !p)} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">No! go back!</button>
</div>
                    </div>
                </div>
                </div>
        )
    }

    const renderUpdate = () => { 
        return (
            <div className="absolute top-[30%] left-[30%] bg-green-200 w-[600px] rounded p-4">
                <div className="flex flex-col justify-start items-center h-[100%]">
                    <h1 className="text-2xl"> Update your details here! </h1>
                    <div>
                        <label className="block mb-2 text-sm text-black font-semibold pt-4">Title</label>
                        <input  onChange={(e) => setData({ ...data, title: e.target.value })} type={ "text"} id="title" placeholder="Title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"  />
                        <label className="block mb-2 text-sm text-black font-semibold pt-4">Content</label>
        <textarea  onChange={(e) => setData({ ...data, content: e.target.value })}  id="content" placeholder="Content" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"  />
                     <div className="text-center">
                            <button onClick={ sendUpdate} type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded text-sm px-5 py-2.5 text-center mt-2 mb-2 ">Update</button>
                        </div>
                         <div className="text-center">
                        <button onClick={()=> setUpdateRender((p)=> !p)} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Not now!</button>
                    </div>
                     </div>
                </div>
                </div>
        )
    }

    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Post on 2nd December 2023
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                    <button onClick={()=> setDel((p) => !p)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 mt-2 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete Blog</button>
                </div>
                <div className="col-span-4">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar size="big" name={blog.author.name || "Anonymous"} />
                            
                        </div>
                       
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                                <span className="ml-8">
                        <button onClick={()=>setUpdateRender((p)=> !p) } type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded text-sm px-5 py-2.5 text-center me-2 mb-2 ">Update Blog</button>
                    
                           </span>
                    
                            </div>
                            <div className="pt-2 text-slate-500">
                               Elevating your online experience with insightful narratives
                            </div>
                        </div>
                        { del && renderDeleteConfimation()}
                        {updateRender && renderUpdate()}   
                        
                    
                    </div>  

                </div>
                
            </div>
        </div>
    </div>
}