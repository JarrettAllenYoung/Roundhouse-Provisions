
        
window.onload = function() {
    function checkRadioButtons() {
        const desktopRadioButton = document.getElementById("three_jars_desktop");
        const mobileRadioButton = document.getElementById("three_jars");
        
        if (desktopRadioButton) {
            desktopRadioButton.checked = true;
            console.info("Desktop radio button 'three_jars_desktop' checked");
        } else {
            console.error("Desktop radio button with id 'three_jars_desktop' not found");
        }
        
        if (mobileRadioButton) {
            mobileRadioButton.checked = true;
            console.info("Mobile radio button 'three_jars' checked");
        } else {
            console.error("Mobile radio button with id 'three_jars' not found");
        }
    }

    checkRadioButtons();
};

// MOBILE SCRIPT
        
        // Function to handle radio button selection
        function handleRadioSelection() {
            // Get all radio buttons
            const radios = document.getElementsByName('radio');
            
            // Initialize a variable to store the selected value
            let selectedValue;
            
            // Loop through the radio buttons to find the checked one
            for (const radio of radios) {
                if (radio.checked) {
                    selectedValue = radio.value;
                    break;
                }
            }
            
            // Display the selected value in the price_amount div
            const priceAmountDiv = document.getElementById('price_amount');
            if (selectedValue) {
                priceAmountDiv.innerHTML = selectedValue;
            } else {
                priceAmountDiv.innerHTML = '$00.00';
            }
        }

        // Add event listeners to radio buttons
        document.addEventListener('DOMContentLoaded', () => {
            const radios = document.getElementsByName('radio');
            for (const radio of radios) {
                radio.addEventListener('change', handleRadioSelection);
            }
        });
        
        
// DESKTOP SCRIPT

        // Function to handle radio button selection
        function handleRadioSelectionDesktop() {
            // Get all radio buttons
            const radiosDesktop = document.getElementsByName('radio_desktop');
            
            // Initialize a variable to store the selected value
            let selectedValueDesktop;
            
            // Loop through the radio buttons to find the checked one
            for (const radio of radiosDesktop) {
                if (radio.checked) {
                    selectedValueDesktop = radio.value;
                    break;
                }
            }
            
            // Display the selected value in the price_amount div
            const priceAmountDivDesktop = document.getElementById('price_amount_desktop');
            if (selectedValueDesktop) {
                priceAmountDivDesktop.innerHTML = selectedValueDesktop;
            } else {
                priceAmountDivDesktop.innerHTML = '$00.00';
            }
        }

        // Add event listeners to radio buttons
        document.addEventListener('DOMContentLoaded', () => {
            const radiosDesktop = document.getElementsByName('radio_desktop');
            for (const radio of radiosDesktop) {
                radio.addEventListener('change', handleRadioSelectionDesktop);
            }
        });
        
