import Hamburger from 'hamburger-react'
import { useState } from 'react';


const HamburgerC = () => {
    const [open, setOpen] = useState(false);


    return (
        <div>
            <Hamburger 
                size={23}
                toggle={setOpen}
                toggled={open}
                />

                {open && <div>
                    menu
                </div>}
        </div>
    );
}

export default HamburgerC;
