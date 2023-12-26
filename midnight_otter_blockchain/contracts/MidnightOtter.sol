// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract MidnightOtter is ERC721, ERC721Enumerable, AccessControl {
    bytes32 public constant MANTAINER_ROLE = keccak256("MANTAINER_ROLE");
    bytes32 public constant PUBLIC_ADMINISTRATOR_ROLE =
        keccak256("PUBLIC_ADMINISTRATOR_ROLE");
    bytes32 public constant EXPERT_ROLE = keccak256("EXPERT_ROLE");
    bytes32 public constant LAWYER_ROLE = keccak256("LAWYER_ROLE");

    /**
     * @dev Structure of the request of the role.
     *
     * @param requestId Id of the request.
     * @param role Role to request (keccak256 of the role name).
     * @param name Name of the user.
     * @param surname Surname of the user.
     * @param user User wallet address.
     *
     */
    struct RequestRole {
        uint256 requestId;
        bytes32 role;
        string name;
        string surname;
        address user;
    }

    // Mapping of the list of users who have requested a role,
    // given a request id, return the request.
    mapping(uint256 => RequestRole) private requestRoleMap;

    // Counter of the request id.
    uint256 private _nextRequestRole;
    uint256 private _pendingRequestCount;

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
        ExihibitInfo exhibitInformation;
        // List of URI for the expert reports
        string[] expertReports;
        // List of events for the chain of custody
        ChainCustody[] chainCustody;
    }

    struct ExihibitInfo {
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

    /**
     * @dev Constructor of the contract.
     *
     * @param mantainer Address of the mantainer of the contract.
     *
     */
    constructor(address mantainer) ERC721("MidnightOtter", "MOK") {
        _grantRole(MANTAINER_ROLE, mantainer);
        // TODO: For testing purpose, the mantainer is also the public administrator.
        _grantRole(PUBLIC_ADMINISTRATOR_ROLE, mantainer);
        _grantRole(EXPERT_ROLE, mantainer);
    }

    // The following functions are required to manage the roles of the contract.

    /**
     * @dev Function to request a role.
     *
     * @param role Role to request (keccak256 of the role name).
     * @param name Name of the user.
     * @param surname Surname of the user.
     *
     */
    function addRequestRoleList(
        bytes32 role,
        string memory name,
        string memory surname
    ) public {
        // Check if the user has already requested the role.
        if (getRoleByAddress(msg.sender) != 0x00) {
            revert("MidnightOtter: The user has already requested the role.");
        }
        // Add the request to the list of requests.
        requestRoleMap[_nextRequestRole] = RequestRole(
            _nextRequestRole,
            role,
            name,
            surname,
            msg.sender
        );
        // Increment the counter of the request id and the counter of the pending requests.
        _nextRequestRole++;
        _pendingRequestCount++;
    }

    /**
     * @dev Function to get the list of the requests.
     *
     */
    function getRequestRoleList() public view returns (RequestRole[] memory) {
        // Create the list of pending requests.
        RequestRole[] memory requestRoleList = new RequestRole[](
            _pendingRequestCount
        );
        // Array index for the pending requests list.
        uint256 pendingRequestId = 0;
        // Add the requests to the list of pending requests.
        for (uint256 i = 0; i < _nextRequestRole; i++) {
            if (
                requestRoleMap[i].user != address(0) &&
                pendingRequestId < _pendingRequestCount
            ) {
                requestRoleList[pendingRequestId++] = requestRoleMap[i];
            }
        }
        return requestRoleList;
    }

    /**
     * @dev Function to grant a role, mantainer and public administrator only can call this function.
     *
     * @param requestId Id of the request.
     *
     */
    function acceptRequestRole(
        uint256 requestId
    ) public onlyRole(PUBLIC_ADMINISTRATOR_ROLE) {
        // Grant the role.
        _grantRole(
            requestRoleMap[requestId].role,
            requestRoleMap[requestId].user
        );
        // Delete the request.
        delete requestRoleMap[requestId];
        // Decrement the counter of the pending requests.
        _pendingRequestCount--;
    }

    /**
     * @dev Function to reject a role, mantainer and public administrator only can call this function.
     *
     * @param requestId Id of the request.
     *
     */
    function rejectRequestRole(
        uint256 requestId
    ) public onlyRole(PUBLIC_ADMINISTRATOR_ROLE) {
        // Delete the request.
        delete requestRoleMap[requestId];
        // Decrement the counter of the pending requests.
        _pendingRequestCount--;
    }

    /**
     * @dev Function to get the role of the user.
     *
     * @param user User to get the role.
     * @return Role of the user (keccak256 of the role name).
     *
     */
    function getRoleByAddress(address user) public view returns (bytes32) {
        if (hasRole(MANTAINER_ROLE, user)) {
            return MANTAINER_ROLE;
        } else if (hasRole(PUBLIC_ADMINISTRATOR_ROLE, user)) {
            return PUBLIC_ADMINISTRATOR_ROLE;
        } else if (hasRole(EXPERT_ROLE, user)) {
            return EXPERT_ROLE;
        } else if (hasRole(LAWYER_ROLE, user)) {
            return LAWYER_ROLE;
        } else {
            return 0x00;
        }
    }

    // The following functions are required to manage the Exihibit of the case.

    // Valid: [12,"pippo",0,"pippo",11,1,1,"pippo","pippo",111,0]
    function safeMint(
        address to,
        ExihibitInfo memory initialTokenStruct
    ) public onlyRole(EXPERT_ROLE) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        Exihibit storage tokenStruct = caseProperties[tokenId];
        tokenStruct.exhibitInformation = initialTokenStruct;
        tokenStruct.expertReports = new string[](0);
        tokenStruct.chainCustody.push(
            ChainCustody(
                block.timestamp,
                initialTokenStruct.submitterOfficer,
                initialTokenStruct.submitterOfficer,
                "Seized"
            )
        );
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
    ) public onlyRole(EXPERT_ROLE) {
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
    ) public onlyRole(EXPERT_ROLE) {
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

    function unshareExihibit(uint256 tokenId) public onlyRole(EXPERT_ROLE) {
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
