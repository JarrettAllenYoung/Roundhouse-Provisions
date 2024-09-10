

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
        
    