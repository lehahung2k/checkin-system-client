import { Button, Typography } from "@mui/material";
import MainCard from "../../../components/cards/MainCard"
import tenantApi from "../../../services/tenantApi";

const CreateNewTenant = () => {
    const handleApi = () => {
        tenantApi
            .getDataFromTenantRole()
            .then((res) => {
                console.log(res.data.payload);
            })
            .catch((e) => {
                console.log('Not found');
            })
    }
    return (
        <MainCard title='Tạo doanh nghiệp của bạn'>
            <Typography variant="body2">
                <Button onClick={handleApi}>
                    Đây là trang tạo doanh nghiệp của bạn
                </Button>
            </Typography>
        </MainCard>
    )
}

export default CreateNewTenant;
