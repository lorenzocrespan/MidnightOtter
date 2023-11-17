// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract MidnightOtter is ERC721, ERC721Enumerable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    uint256 private _nextTokenId;

    /**
     *  @dev Structure of the property of the case.
     *
     *  @param numberCase Number of the case.
     *  @param nameCase Name of the case.
     *
     *  @param expertReports List of URI for the expert reports.
     */
    struct Property {
        // Properties of the case
        uint256 numberCase;
        string nameCase;
        // string nameCreator;
        // List of URI for the expert reports
        string[] expertReports;
        // URI for the chain of custody
        // string chainCustody;
    }

    mapping(uint256 => Property) public caseProperties;

    constructor(
        address defaultAdmin,
        address minter
    ) ERC721("MidnightOtter", "MOK") {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(MINTER_ROLE, minter);
    }

    function safeMint(
        address to,
        Property memory initialTokenStruct
    ) public onlyRole(MINTER_ROLE) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        caseProperties[tokenId] = initialTokenStruct;
    }

    // The following functions are required to interact with the property of the case.

    function getCaseProperties(
        uint256 tokenId
    ) public view returns (Property memory) {
        return caseProperties[tokenId];
    }

    function getOwnerCases(
        address owner
    ) public view returns (uint256[] memory) {
        uint256 balance = balanceOf(owner);
        uint256[] memory cases = new uint256[](balance);
        for (uint256 i = 0; i < balance; i++) {
            cases[i] = tokenOfOwnerByIndex(owner, i);
        }
        return cases;
    }

    function addExpertReport(
        uint256 tokenId,
        string memory expertReport
    ) public onlyRole(MINTER_ROLE) {
        // Check if the sender is the owner of the case
        require(
            ownerOf(tokenId) == msg.sender,
            "MidnightOtter: Only the owner of the case can add an expert report."
        );
        // Add the expert report to the list of expert reports
        caseProperties[tokenId].expertReports.push(expertReport);
    }

    // The following functions are overrides required by Solidity.

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
