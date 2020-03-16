
import {Avatar,Divider} from 'antd'
import '../public/style/components/author.css'

const Author =()=>{

    return (
        <div className="author-div comm-box">
            <div> <Avatar size={100} src="https://avatars3.githubusercontent.com/u/52687479?s=460&u=d56e9ae0767ec47601932c0a7300218e4e00359d&v=4"  /></div>
            <div className="author-introduction">
                Web developer, likes coding, science and technology. Keep calm, dedicated and make epic shit
                <Divider>Social Link</Divider>
                <Avatar size={28} icon="github" className="account"  />
                
            </div>
        </div>
    )

}

export default Author