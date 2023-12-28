// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract MidnightOtter is ERC721, ERC721Enumerable, AccessControl {
    // The following constants are required to manage the roles of the contract.
    bytes32 public constant MANTAINER_ROLE = keccak256("MANTAINER_ROLE");
    bytes32 public constant PUBLIC_ADMINISTRATOR_ROLE = keccak256("PUBLIC_ADMINISTRATOR_ROLE");
    bytes32 public constant EXPERT_ROLE = keccak256("EXPERT_ROLE");
    bytes32 public constant LAWYER_ROLE = keccak256("LAWYER_ROLE");

    /**
     * @dev Mapping the user request (requestId) with the request.
     *
     * @notice Given a request id, return the request.
     *
     */
    mapping(uint256 => RequestRoleStruct) private requestRoleMap;

    // Counter of the request id and the pending requests.
    uint256 private _nextRequestRole;
    uint256 private _pendingRequestRole;

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
    struct RequestRoleStruct {
        uint256 requestId;
        bytes32 role;
        string name;
        string surname;
        address user;
    }

    /**
     * @dev Mapping the exihibit identifier (_nextExihibitUniqueId) with the exihibit data.
     *
     * @notice Given a exihibit identifier, return the exihibit data.
     *
     */
    mapping(uint256 => Exihibit) public exihibitProperties;

    /**
     * @dev Mapping the exihibit identifier (_nextExihibitUniqueId) with the users who have
     * access to the exihibit of the case.
     *
     * @notice Given a exihibit identifier, return the list of users (address) who have
     * access to the exihibit of the case.
     *
     */
    mapping(uint256 => address[]) public exihibitShares;

    /**
     * @dev Mapping the address of the user (user's wallet address) with the list of
     * exihibit transfer requests have the user as receiver.
     *
     * @notice Given a user's wallet address, return the list of exihibit transfer requests
     * have the user as receiver.
     *
     */
    mapping(address => uint256[]) public transferRequests;

    // Counter of the exihibit identifier.
    uint256 private _nextExihibitUniqueId;

    struct ExihibitInfo {
        // Properties of the case
        uint256 caseNumber;
        string caseName;
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
        bool isExihibit;
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
        address releasedBy;
        address receivedBy;
        string action;
    }

    /**
     *  @dev Structure of the exihibit of the case.
     *
     *  @param objectStatus Status of the object (Seized, Released, Destroyed). (Public admin can change it)
     *
     *  @param chainCustody List of events for the chain of custody.
     */
    struct Exihibit {
        // Properties of the case
        ExihibitInfo exhibitInformation;
        // List of URI for the expert reports
        string[] expertReports;
        // List of events for the chain of custody
        ChainCustody[] chainCustody;
        // Requested transfer address
        address requestedTransferReceiver;
    }

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
        requestRoleMap[_nextRequestRole] = RequestRoleStruct(
            _nextRequestRole,
            role,
            name,
            surname,
            msg.sender
        );
        // Increment the counter of the request id and the counter of the pending requests.
        _nextRequestRole++;
        _pendingRequestRole++;
    }

    /**
     * @dev Function to get the list of the requests.
     *
     */
    function getRequestRoleList()
        public
        view
        returns (RequestRoleStruct[] memory)
    {
        // Create the list of pending requests.
        RequestRoleStruct[] memory requestRoleList = new RequestRoleStruct[](
            _pendingRequestRole
        );
        // Array index for the pending requests list.
        uint256 pendingRequestId = 0;
        // Add the requests to the list of pending requests.
        for (uint256 i = 0; i < _nextRequestRole; i++) {
            if (
                requestRoleMap[i].user != address(0) &&
                pendingRequestId < _pendingRequestRole
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
        _pendingRequestRole--;
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
        _pendingRequestRole--;
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
        uint256 tokenId = _nextExihibitUniqueId++;
        _safeMint(to, tokenId);
        Exihibit storage tokenStruct = exihibitProperties[tokenId];
        tokenStruct.exhibitInformation = initialTokenStruct;
        tokenStruct.expertReports = new string[](0);
        tokenStruct.chainCustody.push(
            ChainCustody(block.timestamp, msg.sender, msg.sender, "Seized")
        );
    }

    // The following functions are required to interact with the Exihibit of the case.

    function getCaseProperties(
        uint256 tokenId
    ) public view returns (Exihibit memory) {
        return exihibitProperties[tokenId];
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
        for (uint256 i = 0; i < exihibitShares[tokenId].length; i++) {
            require(
                exihibitShares[tokenId][i] != user,
                "MidnightOtter: The user is already in the list of users."
            );
        }
        // Add the user to the list of users
        exihibitShares[tokenId].push(user);
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
        for (uint256 i = 0; i < exihibitShares[tokenId].length; i++) {
            if (exihibitShares[tokenId][i] == user) {
                isUserInList = true;
            }
        }
        require(
            isUserInList,
            "MidnightOtter: The user is not in the list of users."
        );
        // Remove the user from the list of users
        for (uint256 i = 0; i < exihibitShares[tokenId].length; i++) {
            if (exihibitShares[tokenId][i] == user) {
                delete exihibitShares[tokenId][i];
            }
        }
    }

    /**
     * @dev Function to revoke shared access to an exihibit.
     *
     * @param tokenId Id of the exihibit.
     *
     */
    function unshareExihibit(uint256 tokenId) public onlyRole(EXPERT_ROLE) {
        // Check if the sender is the owner of the exihibit
        require(
            ownerOf(tokenId) == msg.sender,
            "MidnightOtter: Only the owner of the case can unshare the exihibit."
        );
        // Remove all the users from the list of users
        for (uint256 i = 0; i < exihibitShares[tokenId].length; i++) {
            delete exihibitShares[tokenId][i];
        }
    }

    /**
     * @dev Function to check if a user has access to an exihibit.
     *
     * @param tokenId Id of the exihibit.
     * @param userAddress  Address of the user.
     *
     */
    function shareOf(
        uint256 tokenId,
        address userAddress
    ) public view returns (bool) {
        // Check if the user is in the list of users
        for (uint256 i = 0; i < exihibitShares[tokenId].length; i++) {
            if (exihibitShares[tokenId][i] == userAddress) {
                return true;
            }
        }
        return false;
    }

    /**
     * @dev Function to request a transfer for an exihibit.
     *
     * @param tokenId Id of the exihibit.
     * @param senderAddress Address of the entity performing the release.
     * @param receiverAddress Address of the entity receiving the release.
     *
     */
    function requestTrasfer(
        uint256 tokenId,
        address senderAddress,
        address receiverAddress
    ) public onlyRole(EXPERT_ROLE) {
        // Check if the sender is the owner of the exihibit
        require(
            ownerOf(tokenId) == msg.sender,
            "MidnightOtter: Only the owner of the case can request a transfer."
        );
        // Clean the previous transfer request for the exihibit
        if (
            exihibitProperties[tokenId].requestedTransferReceiver != address(0)
        ) {
            delete transferRequests[
                exihibitProperties[tokenId].requestedTransferReceiver
            ];
        }
        // Revoke shared access to the exihibit
        unshareExihibit(tokenId);
        // Update exihibit information about the transfer request
        exihibitProperties[tokenId].requestedTransferReceiver = receiverAddress;
        // Add the exihibit to the list of exihibit transfer requests for the receiver
        transferRequests[exihibitProperties[tokenId].requestedTransferReceiver]
            .push(tokenId);
        // Add the event to the chain of custody
        updateCustodyChain(
            tokenId,
            senderAddress,
            receiverAddress,
            "Requested exihibit transfer"
        );
    }

    /**
     * @dev Function to accept a transfer request for an exihibit.
     *
     * @param tokenId Id of the exihibit.
     * @param responsePerformer Address of the entity performing the accept request.
     * @param requestPerformer Address of the entity receiving the accept request.
     *
     */
    function acceptRequestTrasfer(
        uint256 tokenId,
        address responsePerformer,
        address requestPerformer
    ) public onlyRole(EXPERT_ROLE) {
        // Check if the receiver of the transfer is the sender of the response
        require(
            exihibitProperties[tokenId].requestedTransferReceiver == msg.sender,
            "MidnightOtter: Only the user who receive the transfer can accept it."
        );
        // Trasfer the ownership of the exihibit to the receiver
        _transfer(requestPerformer, responsePerformer, tokenId);
        // Update exihibit information about the transfer request
        exihibitProperties[tokenId].requestedTransferReceiver = address(0);
        // Clean the transfer request for the exihibit
        delete transferRequests[
            exihibitProperties[tokenId].requestedTransferReceiver
        ];
        // Add the event to the chain of custody
        updateCustodyChain(
            tokenId,
            responsePerformer,
            requestPerformer,
            "Accepted exihibit transfer"
        );
    }

    /**
     * @dev Function to reject a transfer request for an exihibit.
     *
     * @param tokenId Id of the exihibit.
     * @param responsePerformer Address of the entity performing the accept request.
     * @param requestPerformer Address of the entity receiving the accept request.
     *
     */
    function rejectRequestTrasfer(
        uint256 tokenId,
        address responsePerformer,
        address requestPerformer
    ) public onlyRole(EXPERT_ROLE) {
        // Check if the receiver of the transfer is the sender of the response
        require(
            exihibitProperties[tokenId].requestedTransferReceiver == msg.sender,
            "MidnightOtter: Only the user who receive the transfer can accept it."
        );
        // Update exihibit information about the transfer request
        exihibitProperties[tokenId].requestedTransferReceiver = address(0);
        // Clean the transfer request for the exihibit
        delete transferRequests[
            exihibitProperties[tokenId].requestedTransferReceiver
        ];
        // Add the event to the chain of custody
        updateCustodyChain(
            tokenId,
            responsePerformer,
            requestPerformer,
            "Rejected exihibit transfer"
        );
    }

    /**
     * @dev Function to add an expert report to specific exihibit.
     *
     * @param tokenId Id of the exihibit.
     * @param expertReportUri URI of the expert report.
     *
     */
    function addExpertReportUri(
        uint256 tokenId,
        string memory expertReportUri
    ) public onlyRole(EXPERT_ROLE) {
        // Check if the sender is the owner of the case or a shared user
        require(
            ownerOf(tokenId) == msg.sender || shareOf(tokenId, msg.sender),
            "MidnightOtter: Only the owner of the case or permitted users can add an expert report."
        );
        // Add expert report to the list of expert reports
        exihibitProperties[tokenId].expertReports.push(expertReportUri);
        // Add the event to the chain of custody
        updateCustodyChain(
            tokenId,
            msg.sender,
            address(0),
            "Added expert report"
        );
    }

    /**
     * @dev Function to update the chain of custody of specific exihibit.
     *
     * @param tokenId Id of the exihibit.
     * @param senderAddress Address of the entity performing the action.
     * @param receiverAddress Address of the entity receiving the action.
     * @param actionPerformed  Action performed on the exihibit.
     *
     */
    function updateCustodyChain(
        uint256 tokenId,
        address senderAddress,
        address receiverAddress,
        string memory actionPerformed
    ) private {
        // Add the event to the chain of custody
        exihibitProperties[tokenId].chainCustody.push(
            ChainCustody(
                block.timestamp,
                senderAddress,
                receiverAddress,
                actionPerformed
            )
        );
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
