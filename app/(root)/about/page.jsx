import { TbBrandNextjs, TbBrandReact } from 'react-icons/tb'
import { FaNode } from 'react-icons/fa'
import { BiLogoMongodb, BiLogoReact } from 'react-icons/bi'
import { FaUserLock } from 'react-icons/fa'
import { SiMui, SiMongoose, SiGithub } from 'react-icons/si'
export default function about() {
    return (
        <div className="aboutBackground">
            <div className="card">
                <div className="card-side front">
                    <div className="card-title">About the project</div>
                </div>
                <div className="card-side back">
                    <div className="card-subtitle">About</div>
                    <div className="card-content">Simplify and streamline the process of managing files and documents</div>
                </div>
            </div>
            <div className="card">
                <div className="card-side front">
                    <div>Technique</div>
                </div>
                <div className="card-side back">
                    <div className="card-subtitle">tech</div>
                    <div className="card-content"><TbBrandNextjs style={{ marginRight: '10px' }} />next js</div>
                    <div className="card-content"><TbBrandReact style={{ marginRight: '10px' }} />react js</div>
                    <div className="card-content"><FaNode style={{ marginRight: '10px' }} />node js</div>
                    <div className="card-content"><FaUserLock style={{ marginRight: '10px' }} />clerk js</div>
                    <div className="card-content"><SiMui style={{ marginRight: '10px' }} />MUI</div>
                    <div className="card-content"><SiMongoose style={{ marginRight: '10px' }} />Mongoose</div>
                    <div className="card-content"><BiLogoReact style={{ marginRight: '10px' }} />React icons</div>
                    <div className="card-content"><BiLogoMongodb style={{ marginRight: '10px' }} />mongodb </div>
                </div>
            </div>
            <div className="card">
                <div className="card-side front">
                    <div>Contact</div>
                </div>
                <div className="card-side back">
                    <div className="card-subtitle">Contact</div>
                    <div className="card-content"><SiGithub style={{ marginRight: '10px' }} />Github : joeng0001</div>
                </div>
            </div>





        </div>
    )
}