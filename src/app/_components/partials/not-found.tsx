import Link from "next/link";
import { Cat } from "lucide-react";
import { Button } from "~/components/ui/button";
export default function NotFound(props:{message:string, margin?:number}){
    return(
        <main style={{
          marginTop:( props.margin || 18)+"em",
          marginBottom: (props.margin || 18)+"em",
        }}
        >
          <Cat className="h-42 w-42 mx-auto" height={150} width={150} />
          <div className="text-2xl font-bold text-center mt-4">
            {props.message}
          </div>
          <Link href="/" className="block text-center mt-4">
            <Button>Back to Home</Button>
          </Link>
        </main>
    )
}