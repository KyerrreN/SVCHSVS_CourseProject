import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Specs from "../../util/specs.json";
import { useDispatch, useSelector } from "react-redux";
import { filterBids } from "../../redux/bids/bidsSlice";

export default function FilterDialog(props) {
    const dispatch = useDispatch();

    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        dispatch(filterBids(value));
        console.log(value);
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Choose needed specialty</DialogTitle>
            <List sx={{ pt: 0 }}>
                {Specs.map((spec) => (
                    <ListItem disableGutters key={spec}>
                        <ListItemButton
                            onClick={() => handleListItemClick(spec)}
                        >
                            <ListItemText primary={spec} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem disableGutters key={""}>
                    <ListItemButton onClick={() => handleListItemClick("")}>
                        <ListItemText
                            primary={"CANCEL"}
                            sx={{ textAlign: "center" }}
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Dialog>
    );
}
