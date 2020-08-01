import React, {useEffect, useState} from 'react';
import {hot} from 'react-hot-loader/root';
import {render} from 'react-dom';
import axios from 'axios';

import {
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    IconButton,
    TextField,
    Typography,
    Card,
    CircularProgress
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    Remove as RemoveIcon
} from '@material-ui/icons';

const getItemText = item => `${item.symbol} : ${item.name}`;

const AddItem = ({options, onAdd}) => {
    const [newItem, setNewItem] = useState(null);
    const [newItemText, setNewItemText] = useState('');

    const addItem = (event, newValue) => {
        onAdd(newValue);
        setNewItem(null);
        setNewItemText('');
    };

    return (
        <Autocomplete options={options}
                      getOptionLabel={getItemText}
                      value={newItem}
                      inputValue={newItemText}
                      onInputChange={(event, newInputValue) => {
                          setNewItemText(newInputValue);
                      }}
                      onChange={addItem}
                      renderInput={params => <TextField {...params} placeholder='Add Item'/>}
        />
    );
};

const WatchList = ({items, onRemove}) => {
    return (
        <Box component={List} display='flex' flexDirection='column' style={{overflowY: 'auto'}}>
            {
                items.map(item => (
                    <ListItem key={`item-${item.id}`}>
                        <ListItemIcon>
                            <IconButton onClick={() => onRemove(item)}>
                                <RemoveIcon/>
                            </IconButton>
                        </ListItemIcon>
                        <ListItemText>
                            {getItemText(item)}
                        </ListItemText>
                    </ListItem>
                ))
            }
        </Box>
    );
};

const SearchableList = ({items, unwatchedItems, onRemove, onAdd}) => {
    const [searchString, setSearchString] = useState('');

    const trimmedLowerSearch = searchString.trim().toLowerCase();
    const relevantItems = items.filter(item => {
        return getItemText(item).toLowerCase().includes(trimmedLowerSearch);
    });

    return (
        <Box display='flex' flexGrow={1} justifyContent='center'>
            <Box display='flex' flexDirection='column' width='50%'>
                <Box height='10%'/>
                <Box component={Card} display='flex' p={5} height='60%' flexDirection='column'
                     justifyContent='space-between'>
                    {
                        items.length === 0 &&
                        <Box component={Typography} display='flex' alignSelf='center'>No items on your watchlist</Box>
                    }
                    {
                        items.length > 0 &&
                        <Box display='flex' flexDirection='column' style={{overflowY: 'auto'}}>
                            <TextField placeholder='Search List'
                                       onChange={e => setSearchString(e.target.value)}></TextField>
                            <WatchList items={relevantItems} onRemove={onRemove}/>
                        </Box>
                    }
                    <AddItem onAdd={onAdd} options={unwatchedItems}/>
                </Box>
            </Box>
        </Box>
    );
};

const App = () => {
    const [unwatchedInstruments, setUnwatchedInstruments] = useState([]);
    const [watchedInstruments, setWatchedInstruments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const onAdd = async item => {
        await axios.post('/api/watchlist', {instrumentId: item.id});

        setUnwatchedInstruments(unwatchedInstruments.filter(instrument => instrument.id !== item.id));
        setWatchedInstruments([...watchedInstruments, item]);
    };

    const onRemove = async item => {
        await axios.delete(`/api/watchlist/${item.id}`);

        setWatchedInstruments(watchedInstruments.filter(instrument => instrument.id !== item.id));
        setUnwatchedInstruments([...unwatchedInstruments, item]);
    };

    useEffect(() => {
        const loadInstruments = async () => {
            try {
                const {data: watchedInstruments} = (await axios.get('/api/watchlist'));
                const {data: unwatchedInstruments} = (await axios.get('/api/instruments/unwatched'));
                setWatchedInstruments(watchedInstruments);
                setUnwatchedInstruments(unwatchedInstruments);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        loadInstruments();
    }, []);

    if (error) {
        return (
            <Box display='flex' flexGrow={1} justifyContent='center' alignItems='center'>
                <Typography>
                    An error occurred, please try to refresh or contact technical support at eden47@gmail.com
                </Typography>
            </Box>
        );
    }

    if (isLoading) {
        return (
            <Box display='flex' flexGrow={1} justifyContent='center' alignItems='center'>
                <CircularProgress/>
            </Box>
        );
    }

    return (
        <Box display='flex' flexGrow={1}>
            <SearchableList items={watchedInstruments}
                            unwatchedItems={unwatchedInstruments}
                            onRemove={onRemove}
                            onAdd={onAdd}/>
        </Box>
    );
};

const Root = hot(() => (
    <App/>
));

render(<Root/>, document.getElementById('root'));