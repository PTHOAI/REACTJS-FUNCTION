import React from "react";

const ListView = ({ childBooms, highlightItemTable, highlightItemSVG, searchTerm, handleChageChildRent, handleRowCheckboxChange, selectedRows }) => {
  return (
    <tbody>
      {Array.isArray(childBooms) && childBooms.length > 0 ? (
        childBooms
          .filter((item) => {
            return searchTerm.toLowerCase() === ""
              ? item
              : item?.COM_CODE?.toLowerCase()?.includes(
                  searchTerm.toLowerCase()
                ) ||
                item?.COM_NAME_VN?.toLowerCase()?.includes(
                  searchTerm.toLowerCase()
                );
          })
          .map((item, index) => (
            <tr
              className='item-table pointer-events-auto'
              key={index}
              data-code={item?.COM_CODE}
              onClick={(e) => {
                highlightItemSVG(item?.COM_CODE)
                highlightItemTable(item?.COM_CODE)
              }}>
              <td
                style={{ textAlign: "center" }}>
                <input
                  type="checkbox"
                  checked={selectedRows?.some((selectedItem) => selectedItem.COM_CODE === item.COM_CODE)}
                  onChange={(e) => handleRowCheckboxChange(e, item)}
                />
              </td>
              <td>
                {item?.COM_CODE}
              </td>
              <td>
                {item?.COM_NAME_VN}
              </td>
              {item?.HAS_CHILD ? (
                <td
                  style={{ textAlign: "center" }}>
                  <i
                    className="bi bi-search"
                    onClick={() => {
                      handleChageChildRent(item);
                    }}></i>
                </td>
              ) : (
                <td
                ></td>
              )}
            </tr>
          ))
      ) : (
        <tr>
          <td colSpan="5" style={{ textAlign: "center" }}>
            Không có dữ liệu
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default ListView;
