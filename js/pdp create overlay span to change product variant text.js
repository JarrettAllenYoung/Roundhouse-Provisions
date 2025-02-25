// Create an overlay span to display the formatted quantity.
  var displaySpan = document.createElement('span');
  displaySpan.className = 'formatted-quantity';
  // Position the span so it overlays the input.
  displaySpan.style.position = 'absolute';
  displaySpan.style.top = '0';
  displaySpan.style.left = '0';
  displaySpan.style.width = '100%';
  displaySpan.style.height = '100%';
  displaySpan.style.display = 'flex';
  displaySpan.style.alignItems = 'center';
  displaySpan.style.justifyContent = 'center';
  displaySpan.style.fontWeight = '600';
  displaySpan.style.pointerEvents = 'none'; // Allow clicks to pass through to the input.

// Updates text but not price
<script>
document.addEventListener("DOMContentLoaded", function() {
  console.log("Offer selector script loaded.");

  // Mapping of input IDs to their singular and plural text.
  // In your case, the input with ID "quantity-selector-a1HVo0000000SynMAE" will use "Bag/Bags"
  // and "quantity-selector-a1HVo0000000NMPMA2" will use "Box/Boxes".
  var selectors = {
    'quantity-selector-a1HVo0000000SynMAE': { singular: 'Bag', plural: 'Bags' },
    'quantity-selector-a1HVo0000000NMPMA2': { singular: 'Box', plural: 'Boxes' }
  };

  // For each input, create a sibling span to display the formatted text and
  // store the current quantity (we expect an initial value of 1).
  Object.keys(selectors).forEach(function(inputId) {
    var input = document.getElementById(inputId);
    if (!input) return;
    
    // Initialize the current quantity (allowed: 1, 3, 6).
    var initialQty = parseInt(input.value, 10) || 1;
    // Store this in a data attribute on the input.
    input.setAttribute('data-current-qty', initialQty);
    
    // Hide the raw number in the input.
    input.style.color = "transparent";
    input.style.textShadow = "none";
    
    // Create a span that will show the formatted text.
    var span = document.createElement("span");
    span.className = "formatted-quantity";
    span.style.marginLeft = "5px";
    // Insert the span right after the input.
    input.insertAdjacentElement("afterend", span);
    
    // Define a function to update the formatted display.
    function updateDisplay() {
      var qty = parseInt(input.getAttribute('data-current-qty'), 10);
      var mapping = selectors[inputId];
      var text;
      if (qty === 1) {
        text = qty + " " + mapping.singular;
      } else {
        text = qty + " " + mapping.plural;
      }
      span.textContent = text;
      // Also update the input's value property if needed.
      input.value = qty;
      console.log("Updated " + inputId + " to " + text);
    }
    
    // Store the update function on the input element for later use.
    input.updateDisplay = updateDisplay;
    // Perform the initial display update.
    updateDisplay();
  });

  // Function to handle plus and minus clicks.
  function handleQuantityChange(button, isPlus) {
    // The button's data-quantity-selector value is the tail part of the input ID.
    var dataId = button.getAttribute("data-quantity-selector");
    // Build the full input ID.
    var inputId = "quantity-selector-" + dataId;
    var input = document.getElementById(inputId);
    if (!input) return;
    
    // Read the current quantity from our data attribute.
    var currentQty = parseInt(input.getAttribute('data-current-qty'), 10);
    
    // Determine the new quantity according to allowed values (1, 3, 6).
    if (isPlus) {
      if (currentQty === 1) {
        currentQty = 3;
      } else if (currentQty === 3) {
        currentQty = 6;
      }
      // If already 6, leave it at 6.
    } else {
      // Minus button pressed.
      if (currentQty === 6) {
        currentQty = 3;
      } else if (currentQty === 3) {
        currentQty = 1;
      }
      // If already 1, leave it at 1.
    }
    
    // Store the new quantity.
    input.setAttribute('data-current-qty', currentQty);
    // Update the display.
    if (typeof input.updateDisplay === "function") {
      input.updateDisplay();
    }
  }
  
  // Attach event listeners to the plus buttons.
  var plusButtons = document.querySelectorAll('.quantity-selector-btn-plus');
  plusButtons.forEach(function(button) {
    button.addEventListener("click", function(e) {
      e.preventDefault(); // Prevent default if necessary.
      handleQuantityChange(button, true);
    });
  });
  
  // Attach event listeners to the minus buttons.
  var minusButtons = document.querySelectorAll('.quantity-selector-btn-minus');
  minusButtons.forEach(function(button) {
    button.addEventListener("click", function(e) {
      e.preventDefault();
      handleQuantityChange(button, false);
    });
  });
});
</script>

