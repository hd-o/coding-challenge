// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EmojiClub is ERC721("EmojiClub", "EMJC"), Ownable {
    // #region Token Properties
    uint16 private _tokenIdCount = 0;
    uint256 private _tokenPrice = 1 ether;
    // #endregion Token Properties

    // #region Error Codes
    string private _eFD = "EmojiClub:function_disabled";
    string private _eCMVNTP = "EmojiClub:msg_value_is_not_token_price";
    // #endregion Error Codes

    function _assertMsgValueIsTokenPrice () private view {
        require(msg.value == _tokenPrice, _eCMVNTP);
    }

    function mint(address to) public payable returns (uint16) {
        _assertMsgValueIsTokenPrice();
        _safeMint(to, _tokenIdCount);
        return _tokenIdCount++;
    }

    function renounceOwnership() public override view onlyOwner {
        revert(_eFD);
    }

    function withdraw(address payable to, uint amount) public onlyOwner {
        to.transfer(amount);
    }
}
