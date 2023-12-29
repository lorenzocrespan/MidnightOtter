// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract MidnightOtter is ERC721, ERC721Enumerable, AccessControl {
    // The following constants are required to manage the roles of the contract.
    bytes32 public constant MANTAINER_ROLE = keccak256("MANTAINER_ROLE");
    bytes32 public constant PUBLIC_ADMIN_ROLE = keccak256("PUBLIC_ADMIN_ROLE");
    bytes32 public constant LAWYER_ROLE = keccak256("LAWYER_ROLE");
    bytes32 public constant EXPERT_ROLE = keccak256("EXPERT_ROLE");

    /**
     * @dev Mapping the user request (requestId) with the request.
     *
     * @notice Given a request id, return the request.
     *
     */
    mapping(uint256 => RequestRoleStruct) private roleRequests;

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

    /**
     * @dev Mapping the case identifier (_nextCaseUniqueId) with the exihibit about the case.
     *
     * @notice Given a case number, return the case.
     *
     */
    mapping(uint256 => Case) public caseProperties;

    /**
     * @dev Mapping the case number (_nextCaseUniqueId) with the exihibit about the case.
     *
     * @notice Given a case number, return the list of exihibits about the case.
     *
     */
    mapping(uint256 => uint256[]) public caseExihibits;

    // Counter of the case identifier.
    uint256 private _nextCaseUniqueId;
    // Counter of the exihibit identifier.
    uint256 private _nextExihibitUniqueId;

    /**
     * @dev Structure of the case.
     *
     * @param caseInformation Properties of the case.
     * @param assignedParties List of users (address) assigned to the case.
     *
     */
    struct Case {
        CaseInfo caseInformation;
        address[] assignedParties;
    }

    /**
     * @dev Structure of the case information.
     *
     * @param caseNumber Identifier of the case.
     * @param caseName Name of the case.
     * @param assignedJudge Identifier of the assigned judge.
     * @param openingEpochTime Date of the opening of the case.
     * @param caseStatus Status of the case.
     */
    struct CaseInfo {
        uint256 caseNumber;
        string caseName;
        address assignedJudge;
        uint256 openingEpochTime;
        CaseStatus caseStatus;
    }

    /**
     * @dev Enum of the case status.
     *
     * @notice Open: the case is open and the exihibit can be added.
     * @notice Closed: the case is closed and the exihibit can't be added.
     *
     */
    enum CaseStatus {
        Open,
        Closed
    }

    /**
     * @dev Structure of the exihibit of the case.
     *
     * @param exhibitInformation Properties of the exihibit.
     * @param requestedTransferReceiver Address of the user who requested the transfer.
     * @param expertReports List of URI for the expert reports.
     * @param chainCustody List of events for the chain of custody.
     *
     */
    struct Exihibit {
        ExihibitInfo exhibitInformation;
        address requestedTransferReceiver;
        string[] expertReports;
        ChainCustody[] chainCustody;
    }

    /**
     * @dev Structure of the exihibit information.
     *
     * @param caseNumber Identifier of the case.
     * @param submitterId Address of the submitter officer.
     * @param objectId Identifier of the object.
     * @param objectQuantity Quantity of the object.
     * @param objectDescription Description of the object.
     * @param seizedLocation Location of the seizure.
     * @param seizedEpochTime Date of the seizure.
     * @param isExihibit Flag to indicate if the object is an exihibit.
     *
     */
    struct ExihibitInfo {
        uint256 caseNumber;
        address submitterId;
        uint256 objectId;
        uint256 objectQuantity;
        string objectDescription;
        string seizedLocation;
        uint256 seizedEpochTime;
        bool isExihibit;
    }

    /**
     *  @dev Structure of the chain of custody.
     *
     *  @param timestamp Timestamp of the event.
     *  @param releasedBy Name of the officer who released the object.
     *  @param receivedBy Name of the officer who received the object.
     *  @param action Action of the event.
     *
     */
    struct ChainCustody {
        uint256 timestamp;
        address releasedBy;
        address receivedBy;
        string action;
    }

    /**
     * @dev Constructor of the contract.
     *
     * @param mantainer Address of the mantainer of the contract.
     *
     */
    constructor(address mantainer) ERC721("MidnightOtter", "MOK") {
        _grantRole(PUBLIC_ADMIN_ROLE, mantainer);
    }

    /**
     * @dev Function to request the registration of a new user to the smart contract.
     *
     * @param role Role to request (keccak256 of the role name).
     * @param name Name of the user.
     * @param surname Surname of the user.
     *
     */
    function addRoleRequest(
        bytes32 role,
        string memory name,
        string memory surname
    ) public {
        // Check if the user has already requested the role.
        if (getRoleByAddress(msg.sender) != 0x00)
            revert("MidnightOtter: The user has already requested the role.");
        // Add the registration request to the list of pending requests.
        roleRequests[_nextRequestRole] = RequestRoleStruct(
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
     * @dev Function to get the list of the requests in pending.
     *
     */
    function getRoleRequests()
        public
        view
        onlyRole(PUBLIC_ADMIN_ROLE)
        returns (RequestRoleStruct[] memory)
    {
        // Create an array of requests with the length of the pending requests.
        RequestRoleStruct[] memory requestRoleArray = new RequestRoleStruct[](
            _pendingRequestRole
        );
        // Array index for the pending requests.
        uint256 pendingRequestIndex = 0;
        // Iterate over the list of requests and add the pending requests to the array.
        for (uint256 i = 0; i < _nextRequestRole; i++) {
            if (
                roleRequests[i].user != address(0) &&
                pendingRequestIndex < _pendingRequestRole
            ) requestRoleArray[pendingRequestIndex++] = roleRequests[i];
        }
        return requestRoleArray;
    }

    /**
     * @dev Function to accept a role request and grant the role to the user or reject the request.
     *
     * @notice Only a public administrator can call this function.
     *
     * @param requestId Id of the request.
     * @param isAccepted Flag to indicate if the request is accepted or rejected.
     *
     */
    function respondRequestRole(
        uint256 requestId,
        bool isAccepted
    ) public onlyRole(PUBLIC_ADMIN_ROLE) {
        // If the request is accepted, grant the role to the user who requested it.
        if (isAccepted)
            _grantRole(
                roleRequests[requestId].role,
                roleRequests[requestId].user
            );
        // Delete the request.
        delete roleRequests[requestId];
        // Decrement the counter of the pending requests.
        _pendingRequestRole--;
    }

    /**
     * @dev Function to get the role of the given user address.
     *
     * @param user User to get the role.
     *
     * @return Role of the user (keccak256 of the role name).
     *
     */
    function getRoleByAddress(address user) public view returns (bytes32) {
        if (hasRole(MANTAINER_ROLE, user)) {
            return MANTAINER_ROLE;
        } else if (hasRole(PUBLIC_ADMIN_ROLE, user)) {
            return PUBLIC_ADMIN_ROLE;
        } else if (hasRole(EXPERT_ROLE, user)) {
            return EXPERT_ROLE;
        } else if (hasRole(LAWYER_ROLE, user)) {
            return LAWYER_ROLE;
        } else {
            return 0x00;
        }
    }

    /**
     * @dev Function to create a new case.
     *
     * @param caseName Name of the case.
     *
     */
    function createCase(
        string memory caseName
    ) public onlyRole(PUBLIC_ADMIN_ROLE) {
        // Create a new case with the given name
        CaseInfo memory initialCaseStruct = CaseInfo(
            _nextCaseUniqueId,
            caseName,
            msg.sender,
            block.timestamp,
            CaseStatus.Open
        );
        Case memory caseStruct = Case(initialCaseStruct, new address[](0));
        // Add the case to the list of cases.
        caseProperties[initialCaseStruct.caseNumber] = caseStruct;
        // Add the case to the list of cases
        caseExihibits[initialCaseStruct.caseNumber] = new uint256[](0);
        // Increment the counter of the case identifier
        _nextCaseUniqueId++;
    }

    /**
     * @dev Function to change the status of a case.
     *
     * @notice Only the assigned judge can call this function.
     *
     */
    function setCaseStatus(
        uint256 caseNumber,
        CaseStatus caseStatus
    ) public onlyRole(PUBLIC_ADMIN_ROLE) {
        // Check if the sender is the assigned judge of the case
        require(
            caseProperties[caseNumber].caseInformation.assignedJudge ==
                msg.sender,
            "MidnightOtter: Only the assigned judge can change the status of the case."
        );
        // Update the status of the case
        caseProperties[caseNumber].caseInformation.caseStatus = caseStatus;
    }

    /**
     * @dev Function to assign a user to a case.
     *
     * @notice Only the assigned judge can call this function.
     *
     */
    function assignUserToCase(
        uint256 caseNumber,
        address user
    ) public onlyRole(PUBLIC_ADMIN_ROLE) {
        // Check if the sender is the assigned judge of the case
        require(
            caseProperties[caseNumber].caseInformation.assignedJudge ==
                msg.sender,
            "MidnightOtter: Only the assigned judge can assign a user to the case."
        );
        // Check if the user is already assigned to the case
        if (_hasAccessToCase(user, caseNumber))
            revert("MidnightOtter: The user is already assigned to the case.");
        // Add the user to the list of assigned users
        caseProperties[caseNumber].assignedParties.push(user);
    }

    /**
     * @dev Function to get the list of the exihibits of a case.
     *
     * @param caseNumber Identifier of the case.
     *
     * @return List of the exihibits of the case.
     *
     */
    function getCaseExihibits(
        uint256 caseNumber
    ) public view returns (uint256[] memory) {
        return caseExihibits[caseNumber];
    }

    /**
     * @dev Function to get the properties of a case.
     *
     * @param caseNumber Identifier of the case.
     *
     * @return Properties of the case.
     *
     */
    function getCaseProperties(
        uint256 caseNumber
    ) public view returns (Case memory) {
        return caseProperties[caseNumber];
    }

    /**
     * @dev Function to add a new exihibit to a case.
     *
     * @notice Only the assigned users can call this function.
     *
     */
    function safeMint(
        address to,
        ExihibitInfo memory initialExihibitInfo
    ) public onlyRole(EXPERT_ROLE) {
        // Check if the sender is one of the assigned users
        require(
            _hasAccessToCase(msg.sender, initialExihibitInfo.caseNumber),
            "MidnightOtter: Only the assigned users can add an exihibit to the case."
        );
        // Generate a new exihibit identifier and mint the exihibit
        uint256 tokenId = _nextExihibitUniqueId++;
        _safeMint(to, tokenId);
        // Create a new exihibit with the given information
        Exihibit storage exihibit = exihibitProperties[tokenId];
        exihibit.exhibitInformation = initialExihibitInfo;
        exihibit.requestedTransferReceiver = address(0);
        // Add the exihibit to the list of exihibits of the case
        caseExihibits[initialExihibitInfo.caseNumber].push(tokenId);
        // Add the event to the chain of custody
        updateCustodyChain(
            tokenId,
            msg.sender,
            address(0),
            "Create exihibit and add to case"
        );
    }

    /**
     * @dev Function to set the validity of a specific exihibit.
     *
     * @param tokenId Id of the exihibit.
     *
     */
    function setExihibitValidity(
        uint256 caseNumber,
        uint256 tokenId,
        bool isValid
    ) public onlyRole(PUBLIC_ADMIN_ROLE) {
        // Check if the sender is the judge of the case
        require(
            caseProperties[caseNumber].caseInformation.assignedJudge ==
                msg.sender,
            "MidnightOtter: Only the assigned judge can set the validity of an exihibit."
        );
        // Update the validity of the exihibit
        exihibitProperties[tokenId].exhibitInformation.isExihibit = isValid;
        // Add the event to the chain of custody
        updateCustodyChain(
            tokenId,
            msg.sender,
            address(0),
            "Set exihibit validity"
        );
    }

    /**
     * @dev Function to get the properties of a specific exihibit given the exihibit identifier.
     *
     * @param tokenId Id of the exihibit.
     *
     */
    function getExihibitProperties(
        uint256 tokenId
    ) public view returns (Exihibit memory) {
        return exihibitProperties[tokenId];
    }

    /**
     * @dev Function to get the exihibit owned by a specific user.
     *
     * @param user Address of the user.
     *
     */
    function getOwnerCases(
        address user
    ) public view returns (uint256[] memory) {
        uint256 balance = balanceOf(user);
        uint256[] memory cases = new uint256[](balance);
        for (uint256 i = 0; i < balance; i++) {
            cases[i] = tokenOfOwnerByIndex(user, i);
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

    /**
     * @dev Function to check if a user has access to a case.
     *
     * @param userAddress  Address of the user.
     * @param caseNumber Identifier of the case.
     *
     * @return True if the user has access to the case, false otherwise.
     *
     */
    function _hasAccessToCase(
        address userAddress,
        uint256 caseNumber
    ) private view returns (bool) {
        // Check if the user is one of the assigned users of the case
        for (
            uint256 i = 0;
            i < caseProperties[caseNumber].assignedParties.length;
            i++
        ) {
            if (caseProperties[caseNumber].assignedParties[i] == userAddress) {
                return true;
            }
        }
        return false;
    }
}
