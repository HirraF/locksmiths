window.attempts = 2

function checkPin() {
    const pinValue = document.querySelector("#pinEntry").value
    if (pinValue !== "1234") {
        showPinError()
    } else {
        document.querySelector("#pinEntry").classList.remove("nhsuk-input--error")
        document.querySelector("#pinEntryForm").classList.remove("nhsuk-form-group--error")
        window.location.href = "./detailsSummary.html"
    }
}

function showPinError() {
    document.querySelector("#pinEntry").classList.add("nhsuk-input--error")
    document.querySelector("#pinEntryForm").classList.add("nhsuk-form-group--error")
    if (attempts < 1) {
        //TODO - redirect to lockout page
        document.querySelector("#lockedOut").style.display = "block"
    } else {
        evaluateCooldown()
        document.querySelector("#incorrectPin").style.display = "block"
    }
}

function evaluateCooldown(delaySeconds = 5) {
    if (delaySeconds < 1) {
        //Cooldown over
        window.attempts--
        document.querySelector("#incorrectPin").style.display = "none"
        document.querySelector("#pinEntry").disabled = false
        document.querySelector("#submit").disabled = false
    } else {
        //Cooldown still going
        document.querySelector("#cooldown").innerText = `Wait ${delaySeconds}s to retry. You have ${window.attempts} attempts remaining.`
        document.querySelector("#incorrectPin").style.display = "block"
        document.querySelector("#pinEntry").disabled = true
        document.querySelector("#submit").disabled = true
        setTimeout(() => evaluateCooldown(delaySeconds - 1), 1000)
    }
}

window.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#submit").onclick = checkPin
})
