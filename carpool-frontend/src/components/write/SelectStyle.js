const styles = (size, minWidth) => ({
    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted #6c282f',
        color: state.isSelected ? '#6c282f' : '#20292f',
        background: state.isSelected ? '#f5f4f2' : 'white',
        padding: 2,
    }),
    control: (provided, state) => {
       return {
        ...provided,
           '&:hover': {borderColor: "#6c282f", 'border': '2px solid #6c282f'},
           'boxShadow': null,
           'borderColor': '#9a5762'
    }},
    container: (provided, state) => {
        const res = {
            ...provided,
            // 'marginTop': '0.2rem',
            'fontSize': '0.8rem',
        };
        (size === 'flex: 1' ? res.flex = 1 : (res.width = `${size}rem`));
        if (minWidth) {
            res['minWidth'] = `${minWidth}`
        }
        return res;
    },
    menu: (provided, state) => {
        return {
            ...provided,
            'marginBottom': 0,
            'marginTop': 0,
        }
    },
    menuList: (provided, state) => {
        return {
            ...provided,
            'paddingBottom': 0,
            'paddingTop': 4
        }
    },
    valueContainer: (provided, state) => {
        return {
            ...provided,
            'padding': '0 5px'
        }
    }
});

export default styles;