const getCSS = (variavel) => {
    const bodyStyles = getComputedStyle(document.body);
    return bodyStyles.getPropertyValue(variavel).trim();
};

const getTickConfig = () => {
    return {
        family: getCSS('--font'),
        size: 16,
        color: getCSS('--primary-color')
    };
};

export { getCSS, getTickConfig };
