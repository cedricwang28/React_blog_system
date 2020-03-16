
import {Avatar,Divider} from 'antd'
import '../public/style/components/author.css'

const Author =()=>{

    return (
        <div className="author-div comm-box">
            <div> <Avatar size={100} src="http://cedricwang.com/static/media/photo2.83d0e553.jpg"  /></div>
            <div className="author-introduction">
                Web developer, likes coding, science and technology. Keep calm, dedicated and make epic shit
                <Divider>Social Link</Divider>
                <Avatar size={28} icon="github" className="account"  />
                
            </div>
        </div>
    )

}

export default Author