#Confirm Deny Modal

## Requirements

You must have:
- AngularJS
- Zurb Foundation
- An active scope

## How it works

The Confirm Deny Modal works by way of callbacks that occur from your controller to your directive. Whilst this is a bit messy, its the only way I could find that would allow for reusability and for it to be called from within *another* directive.

You will need a unique identifier for this modal to make sure it stays separate from other modals.

Example usage:

### Controller.js
```
    $scope.Id = someUniqueIdForThisConfirmDenyModal;
    $scope.firstClickFunction = function(exampleData) {
        // Prepare and load any data binding you want to be seen in the //controller view
        $scope.exampleData = exampleData
         // Make it appear; it will be watching for this $broadcast so use the same text
         $scope.$broadcast("SHOW_CONFIRM_DENY_"+Id);         
    };
    $scope.callbackFunctionInYourScope = function(confirmation) {
        if (confirmation) {
            //Do things
        }
        else {
            // Don't do things!
        }
    }
```

### ControllerView.html
```
<uh-confirm-deny-modal callback="callbackFunctionInYourScope(isConfirmed)" cdm-id="someUniqueIdForThisConfirmDenyModal">
    <h2>Example question?</h2>
    <p>Have some more details.</p>
    <p>Please note that your response to this will be taken seriously.</p>
</uh-confirm-deny-modal>
```
