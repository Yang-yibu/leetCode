import * as React from "react";

export type RawValueType = string | number;
export interface DataNode {
	value?: RawValueType;
	title?: React.ReactNode;
	label?: React.ReactNode;
	// key?: Key;
	key?: React.Key;
	disabled?: boolean;
	disableCheckbox?: boolean;
	checkable?: boolean;
	children?: DataNode[];

	/** Customize data info */
	[prop: string]: any;
}

export interface FieldNames {
	value?: string;
	label?: string;
	children?: string;
}
export interface InternalFieldName extends Omit<FieldNames, "label"> {
	_title: string[];
}

export interface BaseOptionType {
	disabled?: boolean;
	checkable?: boolean;
	disableCheckbox?: boolean;
	children?: BaseOptionType[];
	[name: string]: any;
}
export interface DefaultOptionType extends BaseOptionType {
	value?: RawValueType;
	title?: React.ReactNode;
	label?: React.ReactNode;
	key?: React.Key;
	children?: DefaultOptionType[];
}
export interface LegacyDataNode extends DefaultOptionType {
	props: any;
}

interface TreeSelectProps {
	filterTreeNode?: boolean | ((inputValue: string, treeNode: DefaultOptionType) => boolean);
}

export function fillLegacyProps(dataNode: DataNode): any {
	if (!dataNode) {
		return dataNode;
	}

	const cloneNode = { ...dataNode };

	if (!("props" in cloneNode)) {
		Object.defineProperty(cloneNode, "props", {
			get() {
				// warning(
				console.warn(false, "New `rc-tree-select` not support return node instance as argument anymore. Please consider to remove `props` access.");
				return cloneNode;
			},
		});
	}

	return cloneNode;
}

type GetFuncType<T> = T extends boolean ? never : T;
type FilterFn = GetFuncType<TreeSelectProps["filterTreeNode"]>;

export default (
	treeData: DefaultOptionType[],
	searchValue: string,
	{
		treeNodeFilterProp,
		filterTreeNode,
		fieldNames,
	}: {
		fieldNames: InternalFieldName;
		treeNodeFilterProp: string;
		filterTreeNode: TreeSelectProps["filterTreeNode"];
	}
) => {
	const { children: fieldChildren } = fieldNames;

	return React.useMemo(() => {
		if (!searchValue || filterTreeNode === false) {
			return treeData;
		}

		let filterOptionFunc: FilterFn;
		if (typeof filterTreeNode === "function") {
			filterOptionFunc = filterTreeNode;
		} else {
			const upperStr = searchValue.toUpperCase();
			filterOptionFunc = (_, dataNode) => {
				const value = dataNode[treeNodeFilterProp];

				return String(value).toUpperCase().includes(upperStr);
			};
		}

		function dig(list: DefaultOptionType[], keepAll: boolean = false) {
			return list.reduce<DefaultOptionType[]>((total, dataNode) => {
				const children = dataNode[fieldChildren];

				// 控制是否保留所有下级（父级选中，所有下级也选中）
				// TODO: 需要测试，不显示下级的情况
				const match = keepAll || filterOptionFunc(searchValue, fillLegacyProps(dataNode));
				const childList = dig(children || [], match);

				if (match || childList.length) {
					total.push({
						...dataNode,
						isLeaf: undefined,
						[fieldChildren]: childList,
					});
				}
				return total;
			}, []);
		}

		return dig(treeData);
	}, [treeData, searchValue, fieldChildren, treeNodeFilterProp, filterTreeNode]);
};
