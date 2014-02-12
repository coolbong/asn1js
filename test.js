#!/usr/bin/env node
/*jshint node: true, strict: true, globalstrict: true, es5: true, indent: 4, immed: true, undef: true, unused: true */
'use strict';

var Hex = require('./hex.js'),
    ASN1 = require('./asn1.js'),
    tests;

tests = [
    // http://luca.ntop.org/Teaching/Appunti/asn1.html
    // actually reports the string as "011011100101110111"
    ['03 04 06 6e 5d c0', '(18 bit)\n111011101001110110', 'DER encoding'],
    ['03 04 06 6e 5d e0', '(18 bit)\n111011101001110110', 'padded with "100000"'],
    ['03 81 04 06 6e 5d c0', '(18 bit)\n111011101001110110', 'long form of length octets'],
    ['23 09 03 03 00 6e 5d 03 02 06 c0', '(18 bit)\n111011101001110110', 'constructed encoding: "0110111001011101" + "11"'],
    // http://msdn.microsoft.com/en-us/library/windows/desktop/aa379076(v=vs.85).aspx
    ['30820319308202820201003023310F300D0603550403130654657374434E3110300E060355040A1307546573744F726730819F300D06092A864886F70D010101050003818D00308189028181008FE2412A08E851A88CB3E853E7D54950B3278A2BCBEAB54273EA0257CC6533EE882061A11756C12418E3A808D3BED931F3370B94B8CC43080B7024F79CB18D5DD66D82D0540984F89F970175059C89D4D5C91EC913D72A6B309119D6D442E0C49D7C9271E1B22F5C8DEEF0F1171ED25F315BB19CBC2055BF3A37424575DC90650203010001A08201B4301A060A2B0601040182370D0203310C160A362E302E353336312E323042060A2B0601040182370D0201313430321E260043006500720074006900660069006300610074006500540065006D0070006C0061007400651E080055007300650072305706092B0601040182371514314A30480201090C237669636833642E6A646F6D6373632E6E74746573742E6D6963726F736F66742E636F6D0C154A444F4D4353435C61646D696E6973747261746F720C07636572747265713074060A2B0601040182370D0202316630640201011E5C004D006900630072006F0073006F0066007400200045006E00680061006E006300650064002000430072007900700074006F0067007200610070006800690063002000500072006F00760069006400650072002000760031002E003003010030818206092A864886F70D01090E31753073301706092B0601040182371402040A1E08005500730065007230290603551D2504223020060A2B0601040182370A030406082B0601050507030406082B06010505070302300E0603551D0F0101FF0404030205A0301D0603551D0E041604143C0F73DAF8EF41D83AEABE922A5D2C966A7B9454300D06092A864886F70D01010505000381810047EB995ADF9E700DFBA73132C15F5C24C2E0BFC624AF15660EB86A2EAB2BC4971FE3CBDC63A525ECC7B428616636A1311BBFDDD0FCBF1794901DE55EC7115EC9559FEBA33E14C799A6CBBAA1460F39D444C4C84B760E205D6DA9349ED4D58742EB2426511490B40F065E5288327A9520A0FDF7E57D60DD72689BF57B058F6D1E',
        '(3 elem)', 'PKCS#10 request'],
    // Int10
    ['060C69C7C79AB78084C289F9870D', '2.25.84478768945400492475277', 'Big OID arc'],
    ['02102FA176B36EE9F049F444B40099661945', '(126 bit)\n63312083136615639753586560173617846597', 'Big integer (126 bit)'],
    ['028181008953097086EE6147C5F4D5FFAF1B498A3D11EC5518E964DC52126B2614F743883F64CA51377ABB530DFD20464A48BD67CD27E7B29AEC685C5D10825E605C056E4AB8EEA460FA27E55AA62C498B02D7247A249838A12ECDF37C6011CF4F0EDEA9CEE687C1CB4A51C6AE62B2EFDB000723A01C99D6C23F834880BA8B42D5414E6F',
        '(1024 bit)\n96432446964907009840023644401994013457468837455140331578268642517697945390319089463541388080569398374873228752921897678940332050406994011437231634303608704223145390228074087922901239478374991949372306413157758278029522534299413919735715864599284769202556071242381348472464716517735026291259010477833523908207',
        'Big integer (1024 bit)'],
];

tests.forEach(function (t) {
    var input = t[0],
        expected = t[1],
        comment = t[2],
        result = null;
    try {
        result = ASN1.decode(Hex.decode(input)).content();
        //TODO: check structure, not only first level content
    } catch (e) {
        result = 'Exception:\n' + e;
    }
    if (result == expected)
        console.log('\x1B[1m\x1B[32mOK \x1B[39m\x1B[22m ' + comment);
    else
        console.log('\x1B[1m\x1B[31mERR\x1B[39m\x1B[22m ' + comment + '\n' + result);
});
