import O_json_to_html from "https://unpkg.com/o_json_to_html@1.0.6/o_json_to_html.module.js"

import { O_message } from "./O_message.module.js";
import { O_message_group } from "./O_message_group.module.js";
import { O_message_group_o_user_o_message } from "./O_message_group_o_user_o_message.module.js";
import { O_user } from "./O_user.module.js";

var o_json_to_html = new O_json_to_html()

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("app").append(
        o_json_to_html.f_json_to_html(
            {
                s_t:"div", 
                a_c: [
                    {
                        "v-if": "!o_session", 
                        a_c: [
                            {
                                s_t: "input", 
                                "v-model": "s_o_user_s_email"
                            }, 
                            {
                                s_t: "input", 
                                "v-model": "s_o_user_s_password", 
                            }, 
                            {
                                s_t: "button", 
                                "v-on:click" : "f_login",
                                "v-html": "login"
                            },
                        ]
                    }
                ]
            },
        )
    );


    window.vueObject = new Vue({
        el: '#app',
        data: {
            b_bool: true,
            s_o_user_s_email: '',
            s_o_user_s_password: '',   
            s_o_user_s_password_hashed_sha256: '',   
            n_f_hash_password_timeout: 0, 
            o_api: {
                s_url: "http://localhost/", 
            }
        },
        updated: function(){
        },
        mounted:async function () {
            this.o_session = await f_handle_session();
            this.a_o_page = await this.f_a_o_model_name("o_page");
            this.marked = marked
        },
        watch: {
        },
        methods: {
            f_login: function(){
                await this.f_hash_password();
                console.log(this.s_o_user_s_password_hashed_sha256);
            },
            sha256: async function(s_string){
                // encode as UTF-8
                const msgBuffer = new TextEncoder().encode(s_string);                    
                // hash the message
                const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
                // convert ArrayBuffer to Array
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                // convert bytes to hex string                  
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

                return hashHex;
            },
            f_hash_password: function(){
                this.s_o_user_s_password_hashed_sha256 = await this.f_hash_password(this.s_o_user_s_password);
            },
            f_handle_session: async function(){
                var o_session = JSON.parse(localStorage.getItem('s_o_session', JSON.stringify({n:2})))
                if(!o_session){
                    // no cookie set, login required

                }else{
                    // validate cookie
                    const o_data = this.f_a_o_model_name()
                    
                }
                localStorage.setItem('s_o_session', JSON.stringify({n:2}));
            },
            f_a_o_model_name: async function(
                s_model_name
                ){
                var s_model_name_array = "a_" + s_model_name; 
                var s_model_name_array_kebab_case = this.f_s_kebab_case(s_model_name_array);
                var s_api_url_suffix = "/api/"+this.f_s_kebab_case(s_model_name_array_kebab_case)
                
                var s_url =this.o_api.s_url+s_api_url_suffix 
                const o_response = await fetch(s_url);
                const data = await o_response.json();
                return data.data
            },
            f_s_kebab_case: function(
                s_string
            ){
                var a_s_part = s_string.split("_");
                return a_s_part.join("-") 
            }
        },
        computed: {
            a_o_page_filtered: function(){
                return this.a_o_page
            }
        }
    })
});
