import { notFound } from "next/navigation";
import LoadingPage from "../loading";

export default function LoadingTest(){
    /* disable this page if not in development mode  */
    if(process.env.NODE_ENV !== "development"){
        notFound();
       }
    return(
        <LoadingPage/>
    )
}