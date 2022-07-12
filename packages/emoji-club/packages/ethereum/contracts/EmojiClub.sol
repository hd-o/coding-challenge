// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EmojiClub is ERC721("EmojiClub", "EMJC"), ERC721Enumerable, Ownable {
    // #region Token Properties
    uint16 internal _tokenIdCount = 0;
    uint256 internal _tokenPrice = 1 ether;
    // #endregion Token Properties

    // #region Error Codes
    string internal _eFD = "EmojiClub:function_is_disabled";
    string internal _eCMVNTP = "EmojiClub:msg_value_is_not_token_price";
    // #endregion Error Codes

    function _assertMsgValueIsTokenPrice() internal view {
        require(msg.value == _tokenPrice, _eCMVNTP);
    }

    // #region ERC721Enumerable Overrides

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    // #endregion ERC721Enumerable Overrides

    function getTokens(address addr) public view returns (uint[] memory) {
        uint balance = balanceOf(addr);
        uint[] memory tokens = new uint[](balance);
        for (uint i = 0; i < balance; i++) tokens[i] = tokenOfOwnerByIndex(addr, i);
        return tokens;
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
