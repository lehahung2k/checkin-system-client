import './NotFound.scss'
import {Button} from "@mui/material";

const PageNotFound = () => {
    return(
        <div>
            <div className="number">404</div>
            <div className="text">
                <span>OOP</span><br/>
                Page not found!
            </div>
            <div>
                <p>Tính năng này vẫn còn đang được phát triển. Vùi lòng quay lại sau!</p>
            </div>
            <Button variant="contained" color="primary" href="/">
                Về trang chủ
            </Button>
        </div>
    );
}

export default PageNotFound;
