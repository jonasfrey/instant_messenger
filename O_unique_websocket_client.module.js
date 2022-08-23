import { v5 } from "https://deno.land/std@0.152.0/uuid/mod.ts";


class O_unique_websocket_client{
    constructor(
    ){
        this.s_uuid = crypto.randomUUID();
        // Validate the v4 UUID.
        const b_valid = v5.validate(this.s_uuid);
        console.log(b_valid)
    }
}
export {O_unique_websocket_client}