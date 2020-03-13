#!/bin/bash

# read -ep "要测试的脚本路径："
# # echo $REPLY
# jest --verbose $REPLY

read -ep "要测试的测试脚本：" testPath
jest --verbose $testPath
