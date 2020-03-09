/* eslint-disable */

import recursion from "../../code/recursion/lesson1";

test('recursion: ', () => {
    expect(recursion('25525511135')).toEqual(["255.255.11.135", "255.255.111.35"])

    expect(recursion("010010")).toEqual(["0.10.0.10","0.100.1.0"])
});
