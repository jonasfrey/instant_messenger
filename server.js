// run me like this : 
// $ deno run -A server.js
var o_current_run_info = {
    a_s_argument : Deno.args,
    s_current_path_name_file_name : import.meta.url.split('//')
}
console.log(o_current_run_info)




import { serve } from "https://deno.land/std@0.152.0/http/server.ts";

const n_port = 3333;

const handler = async function(o_request){
  // console.log(o_request.url)
  var a_s_part_path = o_request.url.split("/");
  console.log(a_s_part_path)

  //   if(a_s_part_path[3] == "uploads"){
    //     var a_s_part_path_uploads = a_s_part_path.slice(3) 

    //     // console.log(s_url_uploads)
    //     // var s_url_uploads = "http://lieber-bewusst-sein.ch:1337/"+a_s_part_path_uploads.join("/");
    //     // var o_response = await fetch(s_url_uploads);
    //     // var s_response_text = await o_response.text();

    //     // console.log(o_response)
    //     return new Response(
    //       o_response.body,
    //       {
    //          status: o_response.status, 
    //          headers: o_response.headers
    //       }
    //     );
    //   }
  const s_file_content = await Deno.readTextFile("./client.html");
    // console.log(s_file_content);
    return new Response(
      s_file_content,
      {
         status: 200,
         headers: {
          "Content-Type": "text/html"
        }
      }
    );
};

await serve(handler, { port: n_port });
