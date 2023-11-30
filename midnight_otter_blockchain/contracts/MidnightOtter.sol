// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract MidnightOtter is ERC721, ERC721Enumerable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    uint256 private _nextTokenId;
    /**
     * @notice Enum of the state of the case.
     */
    enum CaseStateValue {
        Open,
        Closed
    }
    /**
     * @notice Enum of the status of the object.
     */
    enum ObjectStatusValue {
        Seized,
        Released,
        Destroyed
    }

    /**
     *  @dev Structure of the exihibit of the case.
     *
     *  @param caseNumber Number of the case.
     *  @param caseName Name of the case.
     *  @param caseState State of the case.
     *
     *  @param submitterOfficer Name of the submitting officer.
     *  @param submitterId Id of the submitter officer.
     *  @param objectId Id of the object.
     *  @param objectQuantity Quantity of the object.
     *  @param objectDescription Description of the object.
     *  @param seizedLocation Location of the seizure.
     *  @param seizedEpochTime Epoch time of the seizure.
     *  @param expertReports List of URI for the expert reports.
     *
     *  @param objectStatus Status of the object (Seized, Released, Destroyed).
     *
     *  @param chainCustody List of events for the chain of custody.
     */
    struct Exihibit {
        // Properties of the case
        uint256 caseNumber;
        string caseName;
        CaseStateValue caseState;
        // Properties of the submitter officer
        string submitterOfficer;
        uint256 submitterId;
        // Properties of the object
        uint256 objectId;
        uint256 objectQuantity;
        string objectDescription;
        // Properties of the seizure
        string seizedLocation;
        uint256 seizedEpochTime;
        // Properties of the object status
        ObjectStatusValue objectStatus;
        // List of URI for the expert reports
        string[] expertReports;
        // List of events for the chain of custody
        ChainCustody[] chainCustody;
    }

    /**
     *  @dev Structure of the chain of custody.
     *
     *  @param timestamp Timestamp of the event.
     *  @param releasedBy Name of the officer who released the object.
     *  @param receivedBy Name of the officer who received the object.
     *  @param action Action of the event.
     */
    struct ChainCustody {
        uint256 timestamp;
        string releasedBy;
        string receivedBy;
        string action;
    }

    // Mapping of the properties of the exihibit of the case
    // Given a token id, return the properties of the case
    mapping(uint256 => Exihibit) public caseProperties;

    // Mapping of the list of users who have access to the exihibit of the case
    // Given a token id, return the list of users
    mapping(uint256 => address[]) public sharedExihibit;

    constructor(
        address defaultAdmin,
        address minter
    ) ERC721("MidnightOtter", "MOK") {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(MINTER_ROLE, minter);
    }

    function safeMint(
        address to,
        Exihibit memory initialTokenStruct
    ) public onlyRole(MINTER_ROLE) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        caseProperties[tokenId] = initialTokenStruct;
    }

    function unsafeMint(address to, Exihibit memory initialTokenStruct) public {
        uint256 tokenId = _nextTokenId++;
        _mint(to, tokenId);
        caseProperties[tokenId] = initialTokenStruct;
    }

    function getActualTokenId() public view returns (uint256) {
        return _nextTokenId;
    }

    // The following functions are required to interact with the Exihibit of the case.

    function getCaseProperties(
        uint256 tokenId
    ) public view returns (Exihibit memory) {
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

    // The following functions are required to manage the sharing of the Exihibit of the case.

    function grantShareExihibit(
        uint256 tokenId,
        address user
    ) public onlyRole(MINTER_ROLE) {
        // Check if the sender is the owner of the case
        require(
            ownerOf(tokenId) == msg.sender,
            "MidnightOtter: Only the owner of the case can share the exihibit."
        );
        // Check if the user is already in the list of users
        for (uint256 i = 0; i < sharedExihibit[tokenId].length; i++) {
            require(
                sharedExihibit[tokenId][i] != user,
                "MidnightOtter: The user is already in the list of users."
            );
        }
        // Add the user to the list of users
        sharedExihibit[tokenId].push(user);
    }

    function ungrantShareExihibit(
        uint256 tokenId,
        address user
    ) public onlyRole(MINTER_ROLE) {
        // Check if the sender is the owner of the case
        require(
            ownerOf(tokenId) == msg.sender,
            "MidnightOtter: Only the owner of the case can unshare the exihibit."
        );
        // Check if the user is in the list of users
        bool isUserInList = false;
        for (uint256 i = 0; i < sharedExihibit[tokenId].length; i++) {
            if (sharedExihibit[tokenId][i] == user) {
                isUserInList = true;
            }
        }
        require(
            isUserInList,
            "MidnightOtter: The user is not in the list of users."
        );
        // Remove the user from the list of users
        for (uint256 i = 0; i < sharedExihibit[tokenId].length; i++) {
            if (sharedExihibit[tokenId][i] == user) {
                delete sharedExihibit[tokenId][i];
            }
        }
    }

    function unshareExihibit(uint256 tokenId) public onlyRole(MINTER_ROLE) {
        // Check if the sender is the owner of the case
        require(
            ownerOf(tokenId) == msg.sender,
            "MidnightOtter: Only the owner of the case can unshare the exihibit."
        );
        // Remove all the users from the list of users
        for (uint256 i = 0; i < sharedExihibit[tokenId].length; i++) {
            delete sharedExihibit[tokenId][i];
        }
    }

    function shareOf(uint256 tokenId, address user) public view returns (bool) {
        // Check if the user is in the list of users
        for (uint256 i = 0; i < sharedExihibit[tokenId].length; i++) {
            if (sharedExihibit[tokenId][i] == user) {
                return true;
            }
        }
        return false;
    }

    // The following functions are required to manage the expert reports of the Exihibit of the case.

    function addExpertReport(
        uint256 tokenId,
        string memory expertReport
    ) public onlyRole(MINTER_ROLE) {
        // Check if the sender is the owner of the exihibit or a shared user
        require(
            ownerOf(tokenId) == msg.sender || shareOf(tokenId, msg.sender),
            "MidnightOtter: Only the owner of the case can add an expert report."
        );
        // Add the expert report to the list of expert reports
        caseProperties[tokenId].expertReports.push(expertReport);
    }

    // The following functions are required to manage the chain of custody of the Exihibit of the case.

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
