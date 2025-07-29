
    function displayOutput(massage){
        const element = document.getElementById("");
        element.innerHTML = massage;
    }

    function calculateMajlis(income){
        var result = income / 100;
        return result
    }
    function calculateIjtema(income){
        var result = income * 0.05
        return result
    }
    function calculateAnnualMajlis(income){
        var result = income / 100;
        var annual = result * 12;
        return annual;
    }
    function calculateAnnualIjtema(income){
        var result = income * 0.05;
        var annual = result * 12
        return annual;
    }
    function calculateChanda(){
        var inputValue = document.getElementById("MonthlyNetIncome").value;
        console.log(inputValue);
        monththlyMajlis.innerHTML = calculateMajlis(parseInt(textfld.value));
        monththlyMajlis.innerHTML = calculateAnnualMajlis(parseInt(textfld.value));
        monththlyMajlis.innerHTML = calculateIjtema(parseInt(textfld.value));
        monththlyMajlis.innerHTML = calculateAnnualIjtema(parseInt(textfld.value));
        monththlyMajlis.innerHTML = calculateMajlis(parseInt(textfld.value));
        totMon.innerHTML = calculateAnnualIjtema(parseInt(txtfld.value)) + calculateAnnualIjtema(parseInt(txtfld.value));
        totAnn.innerHTML = calculateAnnualMajlis(parseInt(txtfld.value)) + calculateAnnualIjtema(parseInt(txtfld.value));
    }

    // 1st txtfld = document.getElementById("");

    // 1st monththlyMajlis = document.getElementById("monMaj");
    // 1st annualMajlis = document.getElementById("annMaj");
    // 1st txtfld = document.getElementById("monIjt");
    // 1st txtfld = document.getElementById("annIjt");
    // 1st txtfld = document.getElementById("totMaj");
    // 1st txtfld = document.getElementById("totIjt");
