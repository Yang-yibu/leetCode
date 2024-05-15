import { strReplace } from './strReplace';

test('执行字符串函数体', () => {
  expect(
    strReplace('{\n"kind": ":clType_gcfc",\n"level": ":clType2_yx",\n"orgCode": ":orgCode_yx"\n}', {
      clType_gcfc: '1',
      clType2_yx: '2',
    })
  ).toEqual('{\n"kind": "1",\n"level": "2",\n"orgCode": ":orgCode_yx"\n}');
});
