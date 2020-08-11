import React, { Component } from 'react'
import {isMobile} from 'react-device-detect';

export class TimePass extends Component {
    render() {
        if(isMobile){
        return (
            <div>
                Dhat Mobile hai
            </div>
        )
        }else{
            return(
                <div>
                    Dhat PC hai
                </div>
            )
        }
    }
}

export default TimePass
