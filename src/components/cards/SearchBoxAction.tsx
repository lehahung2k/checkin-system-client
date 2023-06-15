import {IconButton, InputBase, Paper, useMediaQuery} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {useTheme} from "@mui/material/styles";
import React, {useState, useEffect} from "react";

interface SearchBoxActionProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBoxAction: React.FC<SearchBoxActionProps> = ({onChange}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [isInputVisible, setInputVisible] = useState(!isMobile);

    useEffect(() => {
        setInputVisible(!isMobile);
    }, [isMobile]);
    const handleInputBlur = () => {
        if (isMobile) {
            setInputVisible(false);
        }
    };

    return (
        <Paper
            component="form"
            sx={{
                zIndex: 1100,
                width: '99%',
                p: "0.2rem",
                display: "flex",
                alignItems: "center",
                border: "1px solid #5e35b1",
                maxWidth: isMobile ? "99%" : 300,
            }}
        >
            <>
                <IconButton
                    type="button"
                    sx={{p: "0.1rem"}}
                    aria-label="search"
                >
                    <SearchIcon/>
                </IconButton>
                <InputBase
                    sx={{ml: 1, flex: 1}}
                    placeholder="Tìm kiếm"
                    inputProps={{"aria-label": "search"}}
                    onChange={onChange}
                    onBlur={handleInputBlur}
                />
            </>
        </Paper>
    );
}

export default SearchBoxAction;
