let store = {

    debug : true,
    state : undefined,
    
    remove(item){
        if (this.debug) console.log("[debug:remove] remove item " + item.id);
        this.state.splice(this.state.indexOf(item), 1);
    },
    
    toggle_edited(item){
        if (this.debug) console.log("[debug:toggle_edited] toggle edited property of item "+ item.id + " to " + !item.edited);
        item.edited = !item.edited;
    },
    
    max_id(){
        if (this.state.length==0) return 0;
        let max = this.state[0].id;
        this.state.forEach( e=>{
            if (max<=e.id) max=e.id;
        });
        if (this.debug) console.log("[debug:max_id] return " + max);
        return max;
    },
    
    add(obj){
        if (this.debug) {
            console.log("[debug:add] add a new item");
            if ( 'name' in obj == false || 'firstname' in obj == false || 'email' in obj == false);
            console.log('[debug:add] missing data in obj');
        }

        this.state.push({
            edited: false,
            id: this.max_id() + 1,
            icon: './asset/default.svg',
            name: obj.name,
            firstname: obj.firstname,
            email: obj.email
        });
    }
}

export default store;
    